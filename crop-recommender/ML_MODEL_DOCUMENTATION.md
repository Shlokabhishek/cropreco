# Machine Learning Model Integration

## Overview

This crop recommender project now includes a **Machine Learning (ML) model** powered by TensorFlow.js that enhances crop recommendations with AI-driven predictions. The model uses neural networks to learn from 19,000+ historical crop records and predict crop yields and suitability.

## Features

### 🧠 Neural Network Model
- **Architecture**: Multi-layer neural network with dropout for regularization
- **Input Features**: 
  - Rainfall (mm)
  - Fertilizer usage (kg/hectare)
  - Pesticide usage (kg/hectare)
  - Land acreage (hectares)
  - Season (encoded)
  - Soil type (encoded)
- **Output**: Crop yield prediction (tonnes/hectare)
- **Training**: Uses historical data with 80/20 train-validation split

### 📊 Training Metrics
- **Loss Function**: Mean Squared Error (MSE)
- **Evaluation Metric**: Mean Absolute Error (MAE)
- **Optimizer**: Adam with learning rate 0.001
- **Epochs**: 100 (with early stopping capability)

### 🎯 Enhanced Recommendations
The ML model integrates seamlessly with existing rule-based algorithms:
- **70%** traditional scoring (budget, profitability, ROI)
- **30%** ML-based suitability prediction
- **Confidence scores** for each prediction

## How to Use

### 1. Train the Model

When you first open the application, you'll see the **ML Model Manager** component at the top:

1. Click the **"🚀 Train ML Model"** button
2. Wait for the training process (typically 1-2 minutes)
3. Progress bar shows training stages:
   - Loading data
   - Preprocessing
   - Training
   - Saving model
4. Once complete, the model is saved to browser storage

### 2. Get Enhanced Recommendations

After training:
- All crop recommendations automatically use ML predictions
- Suitability scores are enhanced with AI insights
- The model considers your specific conditions (soil, season, rainfall)

### 3. Retrain Anytime

Click **"🔄 Retrain Model"** to update the model with new data or improve predictions.

## Technical Details

### Model Architecture

```
Input Layer (6 features)
    ↓
Dense Layer (64 units, ReLU) + Dropout (0.2)
    ↓
Dense Layer (32 units, ReLU) + Dropout (0.2)
    ↓
Dense Layer (16 units, ReLU)
    ↓
Output Layer (1 unit, Linear)
```

### Feature Encoding

**Seasons:**
- Kharif: 0
- Rabi: 1
- Zaid: 2
- Summer: 3
- Winter: 4
- Autumn: 5
- Whole Year: 6
- Unknown: 7

**Soil Types:**
- Loamy: 0
- Sandy: 1
- Clay: 2
- Red: 3
- Black: 4
- Alluvial: 5
- Unknown: 6

### Normalization

All features are normalized using z-score standardization:
```
normalized_value = (value - mean) / std_deviation
```

### Storage

- **Model**: Stored in browser's LocalStorage using TensorFlow.js's `localstorage://` backend
- **Scaler Parameters**: Stored separately for consistent normalization
- **Size**: ~50-100 KB
- **Persistence**: Survives browser refresh, cleared only when cache is cleared

## API Reference

### Training

```typescript
import { trainCropModel } from './services/modelTraining';

// Train with progress callback
const result = await trainCropModel(csvData, (progress) => {
  console.log(progress.stage, progress.progress);
});

console.log('Loss:', result.metrics.loss);
console.log('MAE:', result.metrics.mae);
```

### Prediction

```typescript
import { predictCropYield } from './services/modelTraining';

const prediction = await predictCropYield(
  'Rice',      // crop name
  2000,        // rainfall (mm)
  50,          // fertilizer (kg/ha)
  10,          // pesticide (kg/ha)
  5,           // acreage (ha)
  'Kharif',    // season
  'Alluvial'   // soil type
);

console.log('Yield:', prediction.yield);
console.log('Suitability:', prediction.suitability);
console.log('Confidence:', prediction.confidence);
```

### Batch Prediction

```typescript
import { batchPredictCrops } from './services/modelTraining';

const crops = [
  { name: 'Rice', rainfall: 2000, /* ... */ },
  { name: 'Wheat', rainfall: 800, /* ... */ }
];

const predictions = await batchPredictCrops(crops);
predictions.forEach((pred, crop) => {
  console.log(crop.name, pred.yield);
});
```

## Performance

### Training
- **Time**: 1-2 minutes on modern hardware
- **Data**: 19,691 records → ~15,000 training samples (after filtering)
- **Browser**: Runs entirely in the browser, no server required

### Prediction
- **Latency**: <10ms per prediction
- **Batch**: ~50ms for 100 crops
- **Memory**: ~50MB during training, ~10MB during inference

## Benefits

1. **Accuracy**: Learns complex patterns from real historical data
2. **Personalization**: Adapts to your specific farming conditions
3. **Data-Driven**: Based on actual yields from similar conditions
4. **Offline**: Runs entirely in browser after training
5. **Privacy**: No data sent to external servers

## Limitations

1. **Browser Dependency**: Model stored in browser localStorage
2. **Cold Start**: Requires initial training (1-2 minutes)
3. **Data Coverage**: Best for crops/regions in training data
4. **Generalization**: May not perform well for unusual combinations

## Troubleshooting

### Model Won't Train
- **Check console** for error messages
- **Reload page** and try again
- **Clear browser cache** if persistent issues

### Predictions Seem Off
- **Retrain the model** with updated data
- **Check input values** (ensure reasonable ranges)
- **Verify soil type and season** are correctly selected

### Model Lost After Browser Close
- **Model should persist** in localStorage
- If lost, check browser settings (cookies/storage)
- Simply retrain (it's quick!)

## Future Enhancements

1. **Model Updates**: Periodic retraining with new data
2. **Ensemble Methods**: Combine multiple models
3. **Weather Integration**: Use forecast data as features
4. **Explainability**: Show which features influenced predictions
5. **Transfer Learning**: Pre-trained models for different regions

## Credits

- **TensorFlow.js**: Neural network framework
- **Dataset**: Indian crop production data (1997-2020)
- **Architecture**: Designed for agricultural yield prediction

---

**Note**: The ML model enhances but doesn't replace traditional agricultural knowledge. Always consult with local agricultural experts for final decisions.
