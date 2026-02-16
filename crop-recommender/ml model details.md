
Optimizing tool selection...

Based on the project documentation and code, this crop recommender system uses a neural network model implemented with TensorFlow.js for crop yield prediction and suitability scoring.

ML Model Type: Neural Network (Regression)
Architecture:

Multi-layer perceptron (MLP) with 4 layers:
Input layer (6 features)
Hidden layer 1: 64 neurons with ReLU activation + dropout (0.2)
Hidden layer 2: 32 neurons with ReLU activation + dropout (0.2)
Hidden layer 3: 16 neurons with ReLU activation
Output layer: 1 neuron with linear activation (for yield prediction)
Input Features (6):

Rainfall (mm)
Fertilizer usage (kg/hectare)
Pesticide usage (kg/hectare)
Land acreage (hectares)
Season (encoded as numbers 0-7)
Soil type (encoded as numbers 0-6)
Training:

Loss function: Mean Squared Error (MSE)
Optimizer: Adam (learning rate 0.001)
Metrics: Mean Absolute Error (MAE)
Epochs: 100 with early stopping capability
Data: ~15,000 training samples from historical crop records
Validation split: 80/20
Integration:
The neural network predictions are combined with traditional rule-based algorithms:

70% weight on traditional scoring (budget, profitability, ROI)
30% weight on ML-based suitability prediction
Provides confidence scores for each recommendation
Key Benefits:

Runs entirely in the browser using TensorFlow.js
Learns complex patterns from real agricultural data
Provides personalized recommendations based on specific farming conditions
No external server required after initial training
The model enhances but doesn't replace traditional agricultural knowledge, serving as an AI-powered assistant for crop recommendations.