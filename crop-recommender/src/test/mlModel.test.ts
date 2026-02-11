import { describe, it, expect, beforeAll } from 'vitest';
import { CropMLModel, ModelInput, SEASON_ENCODING, SOIL_TYPES } from '../services/mlModel';
import '@tensorflow/tfjs';

describe('CropMLModel', () => {
  let model: CropMLModel;

  beforeAll(() => {
    model = new CropMLModel();
  });

  it('should initialize without errors', () => {
    expect(model).toBeDefined();
    expect(model.isLoaded()).toBe(false);
  });

  it('should train on sample data', async () => {
    const trainingData = {
      features: [
        { rainfall: 2000, fertilizer: 50, pesticide: 10, acreage: 1, season: 'Kharif', soilType: 'Alluvial' },
        { rainfall: 1800, fertilizer: 45, pesticide: 8, acreage: 1, season: 'Kharif', soilType: 'Black' },
        { rainfall: 2200, fertilizer: 55, pesticide: 12, acreage: 1, season: 'Rabi', soilType: 'Red' },
        { rainfall: 1900, fertilizer: 48, pesticide: 9, acreage: 1, season: 'Kharif', soilType: 'Alluvial' },
        { rainfall: 2100, fertilizer: 52, pesticide: 11, acreage: 1, season: 'Rabi', soilType: 'Black' },
      ] as ModelInput[],
      yields: [8.5, 7.8, 6.2, 8.0, 6.8]
    };

    const metrics = await model.trainModel(trainingData);
    
    expect(metrics).toBeDefined();
    expect(metrics.loss).toBeGreaterThan(0);
    expect(metrics.mae).toBeGreaterThan(0);
    expect(model.isLoaded()).toBe(true);
  }, 60000); // 60 second timeout for training

  it('should make predictions after training', async () => {
    const input: ModelInput = {
      rainfall: 2000,
      fertilizer: 50,
      pesticide: 10,
      acreage: 1,
      season: 'Kharif',
      soilType: 'Alluvial'
    };

    const prediction = await model.predict(input);
    
    expect(prediction).toBeDefined();
    expect(prediction.yieldPrediction).toBeGreaterThanOrEqual(0);
    expect(prediction.suitabilityScore).toBeGreaterThanOrEqual(0);
    expect(prediction.suitabilityScore).toBeLessThanOrEqual(100);
    expect(prediction.confidence).toBeGreaterThan(0);
    expect(prediction.confidence).toBeLessThanOrEqual(1);
  });

  it('should handle batch predictions', async () => {
    const inputs: ModelInput[] = [
      { rainfall: 2000, fertilizer: 50, pesticide: 10, acreage: 1, season: 'Kharif', soilType: 'Alluvial' },
      { rainfall: 1800, fertilizer: 45, pesticide: 8, acreage: 1, season: 'Rabi', soilType: 'Black' },
      { rainfall: 2200, fertilizer: 55, pesticide: 12, acreage: 1, season: 'Zaid', soilType: 'Red' }
    ];

    const predictions = await model.batchPredict(inputs);
    
    expect(predictions).toHaveLength(3);
    predictions.forEach(pred => {
      expect(pred.yieldPrediction).toBeGreaterThanOrEqual(0);
      expect(pred.suitabilityScore).toBeGreaterThanOrEqual(0);
      expect(pred.suitabilityScore).toBeLessThanOrEqual(100);
    });
  });

  it('should encode seasons correctly', () => {
    expect(SEASON_ENCODING['Kharif']).toBe(0);
    expect(SEASON_ENCODING['Rabi']).toBe(1);
    expect(SEASON_ENCODING['Zaid']).toBe(2);
    expect(SEASON_ENCODING['Unknown']).toBe(7);
  });

  it('should encode soil types correctly', () => {
    expect(SOIL_TYPES['Loamy']).toBe(0);
    expect(SOIL_TYPES['Sandy']).toBe(1);
    expect(SOIL_TYPES['Alluvial']).toBe(5);
    expect(SOIL_TYPES['Unknown']).toBe(6);
  });

  it('should throw error when predicting without trained model', async () => {
    const freshModel = new CropMLModel();
    const input: ModelInput = {
      rainfall: 2000,
      fertilizer: 50,
      pesticide: 10,
      acreage: 1,
      season: 'Kharif',
      soilType: 'Alluvial'
    };

    await expect(freshModel.predict(input)).rejects.toThrow('Model not loaded');
  });
});
