/**
 * Pre-training Script for Crop ML Model
 * 
 * This script trains the TensorFlow.js neural network model BEFORE the website starts.
 * It reads the crop dataset CSV, trains the model, and saves it as static files
 * in public/ml-model/ so the browser can load it instantly without any wait.
 * 
 * Usage: node scripts/pretrain-model.mjs
 */

import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Suppress TF warnings in console
tf.env().set('PROD', true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ─── Constants (mirrored from src/services/mlModel.ts) ──────────────────────

const SEASON_ENCODING = {
  'Kharif': 0,
  'Rabi': 1,
  'Zaid': 2,
  'Summer': 3,
  'Winter': 4,
  'Autumn': 5,
  'Whole Year': 6,
  'Unknown': 7
};

const SOIL_TYPES = {
  'Loamy': 0,
  'Sandy': 1,
  'Clay': 2,
  'Red': 3,
  'Black': 4,
  'Alluvial': 5,
  'Unknown': 6
};

const STATE_TO_SOIL = {
  'Assam': 'Alluvial',
  'Karnataka': 'Red',
  'Kerala': 'Alluvial',
  'Tamil Nadu': 'Red',
  'Maharashtra': 'Black',
  'Gujarat': 'Black',
  'Punjab': 'Alluvial',
  'Haryana': 'Alluvial',
  'Uttar Pradesh': 'Alluvial',
  'Bihar': 'Alluvial',
  'West Bengal': 'Alluvial',
  'Madhya Pradesh': 'Black',
  'Rajasthan': 'Sandy',
  'Andhra Pradesh': 'Red',
  'Telangana': 'Red',
  'Odisha': 'Red',
  'Chhattisgarh': 'Red',
  'Jharkhand': 'Red'
};

// ─── CSV Parsing (mirrors src/services/recommender.ts parseCSVData) ─────────

function parseCSVData(csvText) {
  const lines = csvText.trim().split('\n');
  const crops = [];

  for (let i = 1; i < lines.length; i++) {
    let parts = lines[i].split('\t');
    if (parts.length < 10) parts = lines[i].split(',');
    if (parts.length < 10) continue;

    const crop = parts[0].trim();
    const season = (parts[2] || '').trim();
    const state = (parts[3] || '').trim();
    const area = parseFloat(parts[4]) || 1;
    const production = parseFloat(parts[5]) || 0;
    const rainfall = parseFloat(parts[6]) || 0;
    const fertilizer = parseFloat(parts[7]) || 0;
    const pesticide = parseFloat(parts[8]) || 0;
    const yieldVal = parseFloat(parts[9]) || 0;

    const yieldPerHectare = area > 0 && yieldVal > 0 ? yieldVal : (production / Math.max(area, 1));

    if (crop && state && yieldPerHectare > 0) {
      crops.push({
        crop,
        season,
        state,
        yieldPerHectare,
        rainfall,
        fertilizer: fertilizer / Math.max(area, 1),
        pesticide: pesticide / Math.max(area, 1)
      });
    }
  }

  return crops;
}

// ─── Model Building (mirrors src/services/mlModel.ts buildModel) ────────────

function buildModel(inputShape) {
  const model = tf.sequential();

  model.add(tf.layers.dense({
    inputShape: [inputShape],
    units: 64,
    activation: 'relu',
    kernelInitializer: 'heNormal'
  }));
  model.add(tf.layers.dropout({ rate: 0.2 }));

  model.add(tf.layers.dense({
    units: 32,
    activation: 'relu',
    kernelInitializer: 'heNormal'
  }));
  model.add(tf.layers.dropout({ rate: 0.2 }));

  model.add(tf.layers.dense({
    units: 16,
    activation: 'relu',
    kernelInitializer: 'heNormal'
  }));

  model.add(tf.layers.dense({
    units: 1,
    activation: 'linear'
  }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError',
    metrics: ['mae']
  });

  return model;
}

// ─── Feature normalization ──────────────────────────────────────────────────

function normalizeFeatures(features) {
  const featureCount = features[0].length;
  const mean = [];
  const std = [];

  for (let i = 0; i < featureCount; i++) {
    const values = features.map(row => row[i]);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    mean.push(avg);

    const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length;
    std.push(Math.sqrt(variance) || 1);
  }

  const normalized = features.map(row =>
    row.map((val, idx) => (val - mean[idx]) / std[idx])
  );

  return { normalized, mean, std };
}

// ─── Main Training Pipeline ─────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   🌾 Crop ML Model — Pre-Training Pipeline      ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  // 1. Load CSV
  const csvPath = path.join(ROOT_DIR, 'public', 'data', 'crop_dataset.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('❌ crop_dataset.csv not found at:', csvPath);
    process.exit(1);
  }

  console.log('📂 Loading crop dataset...');
  const csvText = fs.readFileSync(csvPath, 'utf-8');
  const cropData = parseCSVData(csvText);
  console.log(`   ✓ Loaded ${cropData.length} crop records`);

  // 2. Prepare training data
  console.log('🔧 Preprocessing training data...');
  const trainingFeatures = [];
  const trainingYields = [];

  for (const crop of cropData) {
    if (crop.yieldPerHectare <= 0 || crop.yieldPerHectare > 100) continue;

    const soilType = STATE_TO_SOIL[crop.state] || 'Unknown';

    trainingFeatures.push([
      crop.rainfall || 1000,
      crop.fertilizer || 50,
      crop.pesticide || 10,
      1, // acreage
      SEASON_ENCODING[crop.season] ?? SEASON_ENCODING['Unknown'],
      SOIL_TYPES[soilType] ?? SOIL_TYPES['Unknown']
    ]);
    trainingYields.push(crop.yieldPerHectare);
  }

  console.log(`   ✓ ${trainingFeatures.length} valid training samples prepared`);

  // 3. Normalize
  console.log('📊 Normalizing features (z-score)...');
  const { normalized, mean, std } = normalizeFeatures(trainingFeatures);
  console.log(`   ✓ Feature means: [${mean.map(m => m.toFixed(2)).join(', ')}]`);
  console.log(`   ✓ Feature stds:  [${std.map(s => s.toFixed(2)).join(', ')}]`);

  // 4. Build & train model
  console.log('🧠 Building neural network...');
  const model = buildModel(6);
  model.summary();

  console.log('');
  console.log('🏋️ Training model (100 epochs)...');
  const xs = tf.tensor2d(normalized);
  const ys = tf.tensor2d(trainingYields, [trainingYields.length, 1]);

  const history = await model.fit(xs, ys, {
    epochs: 100,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        if (epoch % 10 === 0 || epoch === 99) {
          const bar = '█'.repeat(Math.floor((epoch + 1) / 5)) + '░'.repeat(20 - Math.floor((epoch + 1) / 5));
          console.log(`   Epoch ${String(epoch + 1).padStart(3)}/100 [${bar}] loss: ${logs.loss.toFixed(4)} | mae: ${logs.mae.toFixed(4)} | val_loss: ${logs.val_loss.toFixed(4)}`);
        }
      }
    },
    verbose: 0
  });

  xs.dispose();
  ys.dispose();

  const finalLoss = history.history.loss[history.history.loss.length - 1];
  const finalMae = history.history.mae[history.history.mae.length - 1];
  const finalValLoss = history.history.val_loss[history.history.val_loss.length - 1];

  console.log('');
  console.log('📈 Training Results:');
  console.log(`   Final Loss:       ${finalLoss.toFixed(4)}`);
  console.log(`   Final MAE:        ${finalMae.toFixed(4)}`);
  console.log(`   Final Val Loss:   ${finalValLoss.toFixed(4)}`);

  // 5. Save model to public/ml-model/
  const outputDir = path.join(ROOT_DIR, 'public', 'ml-model');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('');
  console.log('💾 Saving model to public/ml-model/...');

  // Custom IOHandler to save model files to disk (pure JS tfjs doesn't support file://)
  const saveHandler = {
    async save(modelArtifacts) {
      // Write model.json (topology + weight specs)
      const modelJSON = {
        modelTopology: modelArtifacts.modelTopology,
        weightsManifest: [{
          paths: ['weights.bin'],
          weights: modelArtifacts.weightSpecs
        }],
        format: modelArtifacts.format,
        generatedBy: modelArtifacts.generatedBy,
        convertedBy: modelArtifacts.convertedBy
      };
      fs.writeFileSync(path.join(outputDir, 'model.json'), JSON.stringify(modelJSON));

      // Write weights binary
      if (modelArtifacts.weightData) {
        // weightData can be an ArrayBuffer or an array of ArrayBuffers
        let buffer;
        if (Array.isArray(modelArtifacts.weightData)) {
          // Concatenate all ArrayBuffers
          const totalLen = modelArtifacts.weightData.reduce((sum, ab) => sum + ab.byteLength, 0);
          const combined = new Uint8Array(totalLen);
          let offset = 0;
          for (const ab of modelArtifacts.weightData) {
            combined.set(new Uint8Array(ab), offset);
            offset += ab.byteLength;
          }
          buffer = Buffer.from(combined.buffer);
        } else {
          buffer = Buffer.from(modelArtifacts.weightData);
        }
        fs.writeFileSync(path.join(outputDir, 'weights.bin'), buffer);
      }

      return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
    }
  };

  await model.save(saveHandler);

  // 6. Save scaler JSON alongside the model
  const scalerPath = path.join(outputDir, 'scaler.json');
  fs.writeFileSync(scalerPath, JSON.stringify({ mean, std }, null, 2));
  console.log('   ✓ Model weights saved (model.json + weights.bin)');
  console.log('   ✓ Scaler saved (scaler.json)');

  // 7. Save training metadata
  const metadataPath = path.join(outputDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify({
    trainedAt: new Date().toISOString(),
    samples: trainingFeatures.length,
    epochs: 100,
    finalLoss,
    finalMae,
    finalValLoss,
    features: ['rainfall', 'fertilizer', 'pesticide', 'acreage', 'season_encoded', 'soil_encoded']
  }, null, 2));
  console.log('   ✓ Metadata saved (metadata.json)');

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   ✅ Model pre-trained successfully!             ║');
  console.log('║   The website will load with ML ready instantly. ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
}

main().catch(err => {
  console.error('❌ Pre-training failed:', err);
  process.exit(1);
});
