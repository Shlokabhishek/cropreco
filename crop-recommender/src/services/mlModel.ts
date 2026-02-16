import * as tf from '@tensorflow/tfjs';

// Feature names for the model
export const FEATURE_NAMES = [
  'rainfall',
  'fertilizer',
  'pesticide',
  'acreage',
  'season_encoded',
  'soil_encoded'
] as const;

// Soil type encoding
export const SOIL_TYPES: Record<string, number> = {
  'Loamy': 0,
  'Sandy': 1,
  'Clay': 2,
  'Red': 3,
  'Black': 4,
  'Alluvial': 5,
  'Unknown': 6
};

// Season encoding
export const SEASON_ENCODING: Record<string, number> = {
  'Kharif': 0,
  'Rabi': 1,
  'Zaid': 2,
  'Summer': 3,
  'Winter': 4,
  'Autumn': 5,
  'Whole Year': 6,
  'Unknown': 7
};

export type ModelInput = {
  rainfall: number;
  fertilizer: number;
  pesticide: number;
  acreage: number;
  season: string;
  soilType: string;
};

export type ModelPrediction = {
  yieldPrediction: number;
  suitabilityScore: number;
  confidence: number;
};

export class CropMLModel {
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;
  private scaler: { mean: number[]; std: number[] } | null = null;

  constructor() {
    console.log('CropMLModel initialized');
  }

  /**
   * Build a neural network model for crop yield prediction
   */
  private buildModel(inputShape: number): tf.LayersModel {
    const model = tf.sequential();

    // Input layer with normalization
    model.add(tf.layers.dense({
      inputShape: [inputShape],
      units: 64,
      activation: 'relu',
      kernelInitializer: 'heNormal'
    }));
    
    model.add(tf.layers.dropout({ rate: 0.2 }));

    // Hidden layers
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

    // Output layer - predicting yield
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

  /**
   * Normalize features using z-score normalization
   */
  private normalizeFeatures(features: number[][]): { normalized: number[][]; mean: number[]; std: number[] } {
    const featureCount = features[0].length;
    const mean: number[] = [];
    const std: number[] = [];

    // Calculate mean and std for each feature
    for (let i = 0; i < featureCount; i++) {
      const values = features.map(row => row[i]);
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      mean.push(avg);

      const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length;
      std.push(Math.sqrt(variance) || 1); // Avoid division by zero
    }

    // Normalize
    const normalized = features.map(row =>
      row.map((val, idx) => (val - mean[idx]) / std[idx])
    );

    return { normalized, mean, std };
  }

  /**
   * Apply normalization using stored scaler parameters
   */
  private applyNormalization(features: number[]): number[] {
    if (!this.scaler) {
      console.warn('Scaler not initialized, returning raw features');
      return features;
    }

    return features.map((val, idx) => 
      (val - this.scaler!.mean[idx]) / this.scaler!.std[idx]
    );
  }

  /**
   * Train the model on crop dataset
   */
  async trainModel(
    trainingData: {
      features: ModelInput[];
      yields: number[];
    },
    onEpochProgress?: (epoch: number, totalEpochs: number) => void
  ): Promise<{ loss: number; mae: number }> {
    console.log('Starting model training...');
    
    // Encode features
    const encodedFeatures = trainingData.features.map(input => [
      input.rainfall,
      input.fertilizer,
      input.pesticide,
      input.acreage,
      SEASON_ENCODING[input.season] ?? SEASON_ENCODING['Unknown'],
      SOIL_TYPES[input.soilType] ?? SOIL_TYPES['Unknown']
    ]);

    // Normalize features
    const { normalized, mean, std } = this.normalizeFeatures(encodedFeatures);
    this.scaler = { mean, std };

    // Convert to tensors
    const xs = tf.tensor2d(normalized);
    const ys = tf.tensor2d(trainingData.yields, [trainingData.yields.length, 1]);

    // Build model
    this.model = this.buildModel(FEATURE_NAMES.length);

    // Train model
    const totalEpochs = 100;
    const history = await this.model.fit(xs, ys, {
      epochs: totalEpochs,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          // Report progress to UI
          if (onEpochProgress) {
            onEpochProgress(epoch + 1, totalEpochs);
          }
          
          // Console logging every 20 epochs
          if (epoch % 20 === 0) {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss.toFixed(4)}, mae = ${logs?.mae.toFixed(4)}`);
          }
        }
      },
      verbose: 0
    });

    // Cleanup tensors
    xs.dispose();
    ys.dispose();

    this.isModelLoaded = true;

    const finalLoss = history.history.loss[history.history.loss.length - 1] as number;
    const finalMae = history.history.mae[history.history.mae.length - 1] as number;

    console.log('Model training completed!');
    return { loss: finalLoss, mae: finalMae };
  }

  /**
   * Predict crop yield and suitability
   */
  async predict(input: ModelInput): Promise<ModelPrediction> {
    if (!this.model || !this.isModelLoaded) {
      throw new Error('Model not loaded. Please train or load a model first.');
    }

    // Encode input features
    const encodedInput = [
      input.rainfall,
      input.fertilizer,
      input.pesticide,
      input.acreage,
      SEASON_ENCODING[input.season] ?? SEASON_ENCODING['Unknown'],
      SOIL_TYPES[input.soilType] ?? SOIL_TYPES['Unknown']
    ];

    // Normalize
    const normalizedInput = this.applyNormalization(encodedInput);

    // Make prediction
    const inputTensor = tf.tensor2d([normalizedInput]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const yieldPrediction = (await prediction.data())[0];

    // Calculate suitability score (0-100)
    // Higher yield = higher suitability
    const suitabilityScore = Math.min(100, Math.max(0, yieldPrediction * 10));

    // Calculate confidence based on reasonable yield ranges
    // Typical yields are 0.5 to 10 tons/hectare
    const confidence = yieldPrediction > 0 && yieldPrediction < 15 ? 0.85 : 0.5;

    // Cleanup
    inputTensor.dispose();
    prediction.dispose();

    return {
      yieldPrediction: Math.max(0, yieldPrediction),
      suitabilityScore: Math.round(suitabilityScore),
      confidence
    };
  }

  /**
   * Batch predict for multiple inputs
   */
  async batchPredict(inputs: ModelInput[]): Promise<ModelPrediction[]> {
    if (!this.model || !this.isModelLoaded) {
      throw new Error('Model not loaded. Please train or load a model first.');
    }

    // Encode all inputs
    const encodedInputs = inputs.map(input => [
      input.rainfall,
      input.fertilizer,
      input.pesticide,
      input.acreage,
      SEASON_ENCODING[input.season] ?? SEASON_ENCODING['Unknown'],
      SOIL_TYPES[input.soilType] ?? SOIL_TYPES['Unknown']
    ]);

    // Normalize
    const normalizedInputs = encodedInputs.map(input => this.applyNormalization(input));

    // Make predictions
    const inputTensor = tf.tensor2d(normalizedInputs);
    const predictions = this.model.predict(inputTensor) as tf.Tensor;
    const yieldPredictions = await predictions.data();

    // Cleanup
    inputTensor.dispose();
    predictions.dispose();

    // Convert to prediction objects
    return Array.from(yieldPredictions).map(yieldPrediction => {
      const suitabilityScore = Math.min(100, Math.max(0, yieldPrediction * 10));
      const confidence = yieldPrediction > 0 && yieldPrediction < 15 ? 0.85 : 0.5;

      return {
        yieldPrediction: Math.max(0, yieldPrediction),
        suitabilityScore: Math.round(suitabilityScore),
        confidence
      };
    });
  }

  /**
   * Save model to browser storage
   */
  async saveModel(modelName: string = 'crop-ml-model'): Promise<void> {
    if (!this.model) {
      throw new Error('No model to save');
    }

    await this.model.save(`localstorage://${modelName}`);
    
    // Save scaler separately
    if (this.scaler) {
      localStorage.setItem(`${modelName}-scaler`, JSON.stringify(this.scaler));
    }

    console.log(`Model saved as ${modelName}`);
  }

  /**
   * Load model from browser storage
   */
  async loadModel(modelName: string = 'crop-ml-model'): Promise<void> {
    try {
      this.model = await tf.loadLayersModel(`localstorage://${modelName}`);
      
      // Load scaler
      const scalerData = localStorage.getItem(`${modelName}-scaler`);
      if (scalerData) {
        this.scaler = JSON.parse(scalerData);
      }

      this.isModelLoaded = true;
      console.log(`Model loaded: ${modelName}`);
    } catch (error) {
      // Model not found is expected on first run - not an error
      console.log('Model not found in storage (needs training)');
      throw new Error('Model not found. Please train a model first.');
    }
  }

  /**
   * Check if model is loaded
   */
  isLoaded(): boolean {
    return this.isModelLoaded;
  }

  /**
   * Get model summary
   */
  getModelSummary(): string {
    if (!this.model) {
      return 'No model loaded';
    }
    
    this.model.summary();
    return 'Model summary printed to console';
  }
}

// Singleton instance
let mlModelInstance: CropMLModel | null = null;

/**
 * Get the singleton ML model instance
 */
export function getMLModel(): CropMLModel {
  if (!mlModelInstance) {
    mlModelInstance = new CropMLModel();
  }
  return mlModelInstance;
}
