# Quick Start Guide: Using the ML Model

## Step-by-Step Instructions

### 1. Start the Application

```bash
npm run dev:all
```

Or separately:
```bash
# Terminal 1
npm run dev:server

# Terminal 2
npm run dev
```

### 2. Open in Browser

Navigate to `http://localhost:5173`

### 3. Train the ML Model (First Time Only)

When you open the app, you'll see the **ML Model Manager** component at the top:

```
┌──────────────────────────────────────────┐
│ 🧠 Machine Learning Model                │
│                                          │
│ Status: ○ Not Trained                   │
│                                          │
│ Train the ML model to get AI-powered... │
│ [🚀 Train ML Model]                     │
└──────────────────────────────────────────┘
```

Click the **"🚀 Train ML Model"** button.

### 4. Wait for Training

Watch the progress bar fill up:

```
Progress: Training ML model... This may take a minute.
███████████████░░░░░░░░░ 75%
Loss: 2.4531
MAE: 1.2341
```

Training typically takes **1-2 minutes**. The model learns from 19,000+ crop records.

### 5. Model Ready!

Once training completes, you'll see:

```
┌──────────────────────────────────────────┐
│ 🧠 Machine Learning Model                │
│                                          │
│ Status: ✓ ML Model Ready                │
│                                          │
│ ✓ Model is trained and ready!          │
│ Recommendations will now include         │
│ ML-enhanced predictions.                 │
│                                          │
│ [🔄 Retrain Model]                      │
└──────────────────────────────────────────┘
```

### 6. Get Enhanced Recommendations

Now fill out your **Farmer Profile**:
- State: e.g., "Assam"
- Season: e.g., "Kharif"
- Acreage: e.g., 5 hectares
- Soil Type: e.g., "Alluvial"
- Budget: e.g., ₹100,000

Click **"Get Recommendations"** and scroll down to see:

```
┌──────────────────────────────────────────┐
│ 🌾 Crop Recommendations                  │
│                                          │
│ 1. Rice                                  │
│    Yield: 42.5 tonnes                    │
│    Profit: ₹285,000                      │
│    Score: 0.875 (ML Enhanced)           │
│    Suitability: 92/100                   │
│                                          │
│ 2. Jute                                  │
│    Yield: 18.3 tonnes                    │
│    Profit: ₹165,000                      │
│    Score: 0.823 (ML Enhanced)           │
│    Suitability: 88/100                   │
└──────────────────────────────────────────┘
```

## What's Different?

### Without ML Model
- Uses only traditional algorithms
- Based on simple averages and rules
- Score calculated from budget, profit, ROI

### With ML Model
- **Hybrid approach**: 70% traditional + 30% ML
- Learns patterns from historical data
- Considers complex interactions between:
  - Rainfall
  - Fertilizer usage
  - Pesticide usage
  - Season
  - Soil type
- Provides confidence scores
- More accurate yield predictions

## Example Output

### Console Logs (Check Browser DevTools)

```
Loaded 19691 crop records
Parsed crops: 15234
Training ML model...
Epoch 0: loss = 45.2341, mae = 5.1234
Epoch 20: loss = 12.4532, mae = 2.8934
Epoch 40: loss = 5.6789, mae = 1.7645
Epoch 60: loss = 3.2145, mae = 1.3456
Epoch 80: loss = 2.5632, mae = 1.1987
Model training completed!

Using ML model for enhanced predictions
Rice: ML suitability = 92, Enhanced score = 0.875
Jute: ML suitability = 88, Enhanced score = 0.823
Maize: ML suitability = 85, Enhanced score = 0.798
```

## Tips

### Best Practices
1. **Train once**: Model persists in browser storage
2. **Retrain if**: Data changes or recommendations seem off
3. **Clear cache**: If model acts strange, clear browser cache and retrain

### Troubleshooting

**Q: Model training failed?**
- Check browser console for errors
- Ensure `/data/crop_dataset.csv` is accessible
- Try refreshing the page

**Q: Recommendations not using ML?**
- Verify "✓ ML Model Ready" status
- Check console for "Using ML model" message
- Retrain if necessary

**Q: Model lost after browser close?**
- Should persist in localStorage
- Check browser settings (cookies disabled?)
- Simple fix: retrain (it's fast!)

## Advanced Usage

### Manual Model Management

Check if model exists:
```typescript
import { isModelAvailable } from './services/modelTraining';

if (isModelAvailable()) {
  console.log('Model ready!');
}
```

Load existing model:
```typescript
import { loadExistingModel } from './services/modelTraining';

const loaded = await loadExistingModel();
if (loaded) {
  console.log('Model loaded from storage');
}
```

Get single prediction:
```typescript
import { predictCropYield } from './services/modelTraining';

const result = await predictCropYield(
  'Rice',
  2000,    // rainfall
  50,      // fertilizer
  10,      // pesticide
  5,       // acreage
  'Kharif',
  'Alluvial'
);

console.log('Predicted yield:', result.yield);
```

## Performance

- **Training**: ~90 seconds
- **Prediction**: <10ms per crop
- **Storage**: ~80KB in localStorage
- **Memory**: ~50MB during training, ~10MB after

## Next Steps

1. ✅ Train the model
2. ✅ Fill your profile
3. ✅ Get recommendations
4. 📊 Compare with traditional scores
5. 🌾 Make informed decisions!

---

Happy farming! 🌾
