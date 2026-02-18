# 🌾 Crop Recommender — Algorithm Documentation

## 📂 Documents

| Document | Description |
|----------|-------------|
| [COMPLETE_ALGORITHM_DOCUMENTATION.html](COMPLETE_ALGORITHM_DOCUMENTATION.html) | **Full algorithm docs** — preprocessing, feature selection, model training, evaluation metrics, prediction/recommendation logic, output generation |
| [ER_DIAGRAM.html](ER_DIAGRAM.html) | **Entity-Relationship Diagram** — entities with primary/foreign keys, relationships with cardinality (proper ER symbols: rectangle, oval, diamond) |
| [SYSTEM_FLOWCHART.html](SYSTEM_FLOWCHART.html) | **System Flowchart** — complete processing pipeline with correct flowchart symbols (oval, rectangle, diamond, parallelogram, arrows) |

## ML Model Summary

- **Model:** Deep Neural Network (TensorFlow.js)
- **Architecture:** Dense(64,ReLU) → Dropout(0.2) → Dense(32,ReLU) → Dropout(0.2) → Dense(16,ReLU) → Dense(1,Linear)
- **Input Features:** rainfall, fertilizer, pesticide, acreage, season (encoded), soil type (encoded)
- **Output:** Predicted yield (tonnes/hectare) → suitability score (0-100)
- **Training Data:** 19,000+ Indian crop records
- **Scoring:** 70% traditional scoring + 30% ML suitability
- **Optimizer:** Adam (lr=0.001), Loss: MSE, Metric: MAE
- **Training:** 100 epochs, batch size 32, 20% validation split
