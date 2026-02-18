import React, { useState, useEffect, useRef } from 'react';
import { loadExistingModel, isModelAvailable } from '../../services/modelTraining';
import { getModelDescription, MLModelDescription } from '../../services/mlModel';

interface MLModelManagerProps {
  onModelReady?: () => void;
}

export const MLModelManager: React.FC<MLModelManagerProps> = ({ onModelReady }) => {
  const [modelStatus, setModelStatus] = useState<'loading' | 'trained' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModelDetails, setShowModelDetails] = useState(false);
  const [metadata, setMetadata] = useState<{ trainedAt?: string; samples?: number; finalLoss?: number; finalMae?: number } | null>(null);
  const modelDesc: MLModelDescription = getModelDescription();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      loadModel();
    }
  }, []);

  const loadModel = async () => {
    setModelStatus('loading');

    // Check if model is already in memory
    if (isModelAvailable()) {
      setModelStatus('trained');
      onModelReady?.();
      loadMetadata();
      return;
    }

    // Load the pre-trained model from static files (public/ml-model/)
    const loaded = await loadExistingModel();
    if (loaded) {
      setModelStatus('trained');
      onModelReady?.();
      loadMetadata();
    } else {
      setModelStatus('error');
      setErrorMessage('Pre-trained model not found. Please run "npm run pretrain" first, then restart the dev server.');
    }
  };

  const loadMetadata = async () => {
    try {
      const resp = await fetch('/ml-model/metadata.json');
      if (resp.ok) {
        setMetadata(await resp.json());
      }
    } catch {
      // metadata is optional
    }
  };

  const getStatusColor = () => {
    switch (modelStatus) {
      case 'trained': return '#4CAF50';
      case 'error': return '#f44336';
      case 'loading': return '#2196F3';
      default: return '#2196F3';
    }
  };

  const getStatusText = () => {
    switch (modelStatus) {
      case 'trained': return '✓ ML Model Ready';
      case 'error': return '✗ Model Load Error';
      case 'loading': return '⟳ Loading pre-trained model...';
      default: return '⟳ Loading...';
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

      {modelStatus === 'loading' && (
        <div style={{ marginTop: '10px' }}>
          <div style={{
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            height: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '60%',
              height: '100%',
              backgroundColor: '#2196F3',
              borderRadius: '4px',
              animation: 'loading-pulse 1.2s ease-in-out infinite alternate'
            }} />
          </div>
          <p style={{ color: '#666', fontSize: '13px', marginTop: '6px' }}>
            Loading pre-trained neural network model...
          </p>
          <style>{`@keyframes loading-pulse { from { width: 20%; } to { width: 80%; } }`}</style>
        </div>
      )}

      {modelStatus === 'trained' && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ color: '#4CAF50', marginBottom: '8px', fontSize: '14px' }}>
            ✓ Pre-trained model loaded! Recommendations include ML-enhanced predictions.
          </p>
          {metadata && (
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              fontSize: '12px',
              color: '#555'
            }}>
              {metadata.samples && (
                <span style={{ padding: '4px 10px', backgroundColor: '#e8f5e9', borderRadius: '12px' }}>
                  📊 {metadata.samples.toLocaleString()} training samples
                </span>
              )}
              {metadata.finalMae != null && (
                <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', borderRadius: '12px' }}>
                  📉 MAE: {metadata.finalMae.toFixed(4)}
                </span>
              )}
              {metadata.finalLoss != null && (
                <span style={{ padding: '4px 10px', backgroundColor: '#fff3e0', borderRadius: '12px' }}>
                  📈 Loss: {metadata.finalLoss.toFixed(4)}
                </span>
              )}
              {metadata.trainedAt && (
                <span style={{ padding: '4px 10px', backgroundColor: '#f3e5f5', borderRadius: '12px' }}>
                  🕐 Trained: {new Date(metadata.trainedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {modelStatus === 'error' && (
        <div style={{
          marginTop: '10px',
          padding: '12px',
          backgroundColor: '#ffebee',
          borderRadius: '6px',
          border: '1px solid #f44336'
        }}>
          <p style={{ color: '#d32f2f', margin: '0 0 8px 0', fontSize: '14px' }}>
            <strong>Error:</strong> {errorMessage}
          </p>
          <button
            onClick={loadModel}
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
            🔄 Retry Loading
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
        <strong>How it works:</strong> The ML model is pre-trained at build time on 19,000+ historical crop records
        using a deep neural network. It loads instantly when you open the site — no waiting required.
        It enhances recommendations by predicting crop suitability for your specific conditions.
      </div>

      {/* ML Model Description Section */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setShowModelDetails(!showModelDetails)}
          style={{
            padding: '10px 18px',
            backgroundColor: '#1565c0',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          📋 {showModelDetails ? 'Hide' : 'Show'} ML Model Description
          <span style={{ fontSize: '12px' }}>{showModelDetails ? '▲' : '▼'}</span>
        </button>

        {showModelDetails && (
          <div style={{
            marginTop: '12px',
            border: '2px solid #1565c0',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {/* Model Name & Type */}
            <div style={{
              backgroundColor: '#1565c0',
              color: 'white',
              padding: '14px 18px'
            }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
                🤖 {modelDesc.name}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                {modelDesc.type}
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f5f8ff' }}>
              {/* Architecture */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  🏗️ Neural Network Architecture
                </h5>
                <code style={{
                  display: 'block',
                  padding: '10px',
                  backgroundColor: '#e8eaf6',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {modelDesc.architecture}
                </code>
              </div>

              {/* Input Features */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  📥 Input Features ({modelDesc.inputFeatures.length})
                </h5>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  lineHeight: '1.6'
                }}>
                  {modelDesc.inputFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Output */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  📤 Output
                </h5>
                <p style={{ margin: 0, fontSize: '13px', padding: '8px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
                  {modelDesc.outputDescription}
                </p>
              </div>

              {/* Training Details */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  🎓 Training Details
                </h5>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px',
                  fontSize: '13px'
                }}>
                  {([
                    ['Dataset', modelDesc.trainingDetails.dataset],
                    ['Dataset Size', modelDesc.trainingDetails.datasetSize],
                    ['Preprocessing', modelDesc.trainingDetails.preprocessing],
                    ['Feature Selection', modelDesc.trainingDetails.featureSelection],
                    ['Optimizer', modelDesc.trainingDetails.optimizer],
                    ['Loss Function', modelDesc.trainingDetails.lossFunction],
                    ['Epochs', String(modelDesc.trainingDetails.epochs)],
                    ['Batch Size', String(modelDesc.trainingDetails.batchSize)],
                    ['Validation Split', `${modelDesc.trainingDetails.validationSplit * 100}%`],
                    ['Normalization', modelDesc.trainingDetails.normalization]
                  ] as [string, string][]).map(([label, value], i) => (
                    <div key={i} style={{
                      padding: '8px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0'
                    }}>
                      <div style={{ fontWeight: '600', color: '#333', marginBottom: '2px' }}>{label}</div>
                      <div style={{ color: '#666' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prediction Flow */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  🔄 Prediction Flow
                </h5>
                <ol style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  lineHeight: '1.8'
                }}>
                  {modelDesc.predictionFlow.map((step, i) => (
                    <li key={i} style={{ paddingLeft: '4px' }}>
                      {step.replace(/^\d+\.\s/, '')}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Recommendation Logic */}
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  🎯 Recommendation Generation Logic
                </h5>
                <ol style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  lineHeight: '1.8'
                }}>
                  {modelDesc.recommendationLogic.map((step, i) => (
                    <li key={i} style={{ paddingLeft: '4px' }}>
                      {step.replace(/^\d+\.\s/, '')}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Evaluation Metrics */}
              <div>
                <h5 style={{ margin: '0 0 6px 0', color: '#1565c0', fontSize: '14px' }}>
                  📊 Evaluation Metrics
                </h5>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  lineHeight: '1.6'
                }}>
                  {modelDesc.evaluationMetrics.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
