import React, { useState, useEffect } from 'react';
import { trainCropModel, loadExistingModel, isModelAvailable, TrainingProgress } from '../../services/modelTraining';

export const MLModelManager: React.FC = () => {
  const [modelStatus, setModelStatus] = useState<'not-trained' | 'loading' | 'trained' | 'training' | 'error'>('not-trained');
  const [trainingProgress, setTrainingProgress] = useState<TrainingProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    checkModelStatus();
  }, []);

  const checkModelStatus = async () => {
    setModelStatus('loading');
    
    // First check if model is already in memory
    if (isModelAvailable()) {
      setModelStatus('trained');
      return;
    }
    
    // Try to load existing model from localStorage
    const loaded = await loadExistingModel();
    setModelStatus(loaded ? 'trained' : 'not-trained');
  };

  const handleTrainModel = async () => {
    try {
      setModelStatus('training');
      setErrorMessage('');
      
      // Load crop dataset
      const response = await fetch('/data/crop_dataset.csv');
      if (!response.ok) {
        throw new Error('Failed to load crop dataset');
      }
      
      const csvData = await response.text();
      
      const result = await trainCropModel(csvData, (progress) => {
        setTrainingProgress(progress);
      });
      
      if (result.success) {
        setModelStatus('trained');
        alert(`Model trained successfully!\nLoss: ${result.metrics?.loss.toFixed(4)}\nMAE: ${result.metrics?.mae.toFixed(4)}`);
      } else {
        setModelStatus('error');
        setErrorMessage(result.error || 'Training failed');
      }
    } catch (error) {
      setModelStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      console.error('Training error:', error);
    }
  };

  const getStatusColor = () => {
    switch (modelStatus) {
      case 'trained': return 'green';
      case 'training': return 'blue';
      case 'error': return 'red';
      case 'loading': return 'gray';
      default: return 'orange';
    }
  };

  const getStatusText = () => {
    switch (modelStatus) {
      case 'trained': return '✓ ML Model Ready';
      case 'training': return '⟳ Training...';
      case 'error': return '✗ Error';
      case 'loading': return '⟳ Checking...';
      default: return '○ Not Trained';
    }
  };

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>🧠 Machine Learning Model</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '4px',
          border: `2px solid ${getStatusColor()}`,
          display: 'inline-block'
        }}>
          <strong>Status:</strong> <span style={{ color: getStatusColor() }}>{getStatusText()}</span>
        </div>
      </div>

      {modelStatus === 'not-trained' && (
        <div style={{ marginBottom: '15px' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Train the ML model to get AI-powered crop recommendations based on historical data.
            The model uses neural networks to predict crop yields and suitability.
          </p>
          <button
            onClick={handleTrainModel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🚀 Train ML Model
          </button>
        </div>
      )}

      {modelStatus === 'training' && trainingProgress && (
        <div style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Progress:</strong> {trainingProgress.message}
          </div>
          <div style={{
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            height: '24px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${trainingProgress.progress}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {trainingProgress.progress}%
            </div>
          </div>
          {trainingProgress.metrics && (
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              <div>Loss: {trainingProgress.metrics.loss.toFixed(4)}</div>
              <div>MAE: {trainingProgress.metrics.mae.toFixed(4)}</div>
            </div>
          )}
        </div>
      )}

      {modelStatus === 'trained' && (
        <div style={{ marginTop: '15px' }}>
          <p style={{ color: '#4CAF50', marginBottom: '10px' }}>
            ✓ Model is trained and ready! Recommendations will now include ML-enhanced predictions.
          </p>
          <button
            onClick={handleTrainModel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Retrain Model
          </button>
        </div>
      )}

      {modelStatus === 'error' && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #f44336'
        }}>
          <p style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>
            <strong>Error:</strong> {errorMessage}
          </p>
          <button
            onClick={handleTrainModel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Retry Training
          </button>
        </div>
      )}

      <div style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#1565c0'
      }}>
        <strong>How it works:</strong> The ML model is trained on 19,000+ historical crop records,
        learning patterns between rainfall, fertilizer, pesticide usage, and crop yields.
        It enhances recommendations by predicting crop suitability for your specific conditions.
      </div>
    </div>
  );
};
