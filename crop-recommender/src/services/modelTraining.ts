import { getMLModel, ModelInput } from './mlModel';
import { parseCSVData } from './recommender';

export type TrainingProgress = {
  stage: 'loading' | 'preprocessing' | 'training' | 'saving' | 'complete' | 'error';
  progress: number;
  message: string;
  metrics?: { loss: number; mae: number };
};

/**
 * Train the ML model using the crop dataset
 */
export async function trainCropModel(
  csvData: string,
  onProgress?: (progress: TrainingProgress) => void
): Promise<{ success: boolean; metrics?: { loss: number; mae: number }; error?: string }> {
  try {
    // Stage 1: Loading data
    onProgress?.({
      stage: 'loading',
      progress: 10,
      message: 'Loading crop dataset...'
    });

    const cropData = parseCSVData(csvData);
    
    if (cropData.length === 0) {
      throw new Error('No valid crop data found');
    }

    console.log(`Loaded ${cropData.length} crop records`);

    // Stage 2: Preprocessing
    onProgress?.({
      stage: 'preprocessing',
      progress: 30,
      message: `Preprocessing ${cropData.length} crop records...`
    });

    // Prepare training data
    const trainingFeatures: ModelInput[] = [];
    const trainingYields: number[] = [];

    // Map soil types from states (this is a simplification)
    const stateToSoil: Record<string, string> = {
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

    for (const crop of cropData) {
      // Skip invalid data
      if (crop.yieldPerHectare <= 0 || crop.yieldPerHectare > 100) {
        continue;
      }

      const soilType = stateToSoil[crop.state] || 'Unknown';
      
      // Estimate acreage (we'll use 1 as default since we don't have actual acreage in predictions)
      const acreage = 1;

      trainingFeatures.push({
        rainfall: crop.rainfall || 1000,
        fertilizer: crop.fertilizer || 50,
        pesticide: crop.pesticide || 10,
        acreage: acreage,
        season: crop.season || 'Unknown',
        soilType: soilType
      });

      trainingYields.push(crop.yieldPerHectare);
    }

    console.log(`Prepared ${trainingFeatures.length} training samples`);

    // Stage 3: Training
    onProgress?.({
      stage: 'training',
      progress: 50,
      message: 'Training ML model... This may take a minute.'
    });

    const mlModel = getMLModel();
    const metrics = await mlModel.trainModel(
      {
        features: trainingFeatures,
        yields: trainingYields
      },
      (epoch: number, totalEpochs: number) => {
        // Progress from 50% to 85% during training
        const trainingProgress = 50 + Math.floor((epoch / totalEpochs) * 35);
        onProgress?.({
          stage: 'training',
          progress: trainingProgress,
          message: `Training ML model... Epoch ${epoch}/${totalEpochs}`
        });
      }
    );

    console.log('Training metrics:', metrics);

    // Stage 4: Saving
    onProgress?.({
      stage: 'saving',
      progress: 90,
      message: 'Saving trained model...'
    });

    await mlModel.saveModel('crop-ml-model');

    // Stage 5: Complete
    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'Model training complete!',
      metrics
    });

    return { success: true, metrics };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Model training failed:', error);
    
    onProgress?.({
      stage: 'error',
      progress: 0,
      message: `Training failed: ${errorMessage}`
    });

    return { success: false, error: errorMessage };
  }
}

/**
 * Load existing model if available
 */
export async function loadExistingModel(): Promise<boolean> {
  try {
    const mlModel = getMLModel();
    await mlModel.loadModel('crop-ml-model');
    console.log('✅ ML model loaded from storage');
    return true;
  } catch (error) {
    // This is expected on first run - model needs to be trained
    console.log('ℹ️ No trained model found - please train the model');
    return false;
  }
}

/**
 * Check if model is available and trained
 */
export function isModelAvailable(): boolean {
  const mlModel = getMLModel();
  return mlModel.isLoaded();
}

/**
 * Get crop yield prediction using ML model
 */
export async function predictCropYield(
  _cropName: string,
  rainfall: number,
  fertilizer: number,
  pesticide: number,
  acreage: number,
  season: string,
  soilType: string
): Promise<{ yield: number; suitability: number; confidence: number } | null> {
  try {
    const mlModel = getMLModel();
    
    if (!mlModel.isLoaded()) {
      // Try to load existing model
      const loaded = await loadExistingModel();
      if (!loaded) {
        console.log('Model not available for prediction');
        return null;
      }
    }

    const prediction = await mlModel.predict({
      rainfall,
      fertilizer,
      pesticide,
      acreage,
      season,
      soilType
    });

    return {
      yield: prediction.yieldPrediction,
      suitability: prediction.suitabilityScore,
      confidence: prediction.confidence
    };

  } catch (error) {
    console.error('Prediction failed:', error);
    return null;
  }
}

/**
 * Batch predict for multiple crops
 */
export async function batchPredictCrops(
  crops: Array<{
    name: string;
    rainfall: number;
    fertilizer: number;
    pesticide: number;
    acreage: number;
    season: string;
    soilType: string;
  }>
): Promise<Map<string, { yield: number; suitability: number; confidence: number }>> {
  const results = new Map();

  try {
    const mlModel = getMLModel();
    
    if (!mlModel.isLoaded()) {
      const loaded = await loadExistingModel();
      if (!loaded) {
        console.log('Model not available for batch prediction');
        return results;
      }
    }

    const inputs: ModelInput[] = crops.map(crop => ({
      rainfall: crop.rainfall,
      fertilizer: crop.fertilizer,
      pesticide: crop.pesticide,
      acreage: crop.acreage,
      season: crop.season,
      soilType: crop.soilType
    }));

    const predictions = await mlModel.batchPredict(inputs);

    crops.forEach((crop, index) => {
      const prediction = predictions[index];
      results.set(crop.name, {
        yield: prediction.yieldPrediction,
        suitability: prediction.suitabilityScore,
        confidence: prediction.confidence
      });
    });

  } catch (error) {
    console.error('Batch prediction failed:', error);
  }

  return results;
}
