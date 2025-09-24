import React, { useState, useEffect } from 'react';
import { 
  Database, Brain, BarChart3, CheckCircle, 
  Code, Cpu, Layers, Activity, ChevronDown,
  ChevronUp, Download, PlayCircle, ArrowRight
} from 'lucide-react';

// Animated progress bar component
const ProgressBar = ({ percentage, color }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div style={{
      width: '100%',
      height: '8px',
      backgroundColor: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '0.5rem'
    }}>
      <div style={{
        width: `${width}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '4px',
        transition: 'width 1s ease-in-out'
      }} />
    </div>
  );
};

// Expandable card component
const ExpandableCard = ({ icon, title, description, isExpanded, onClick, color }) => {
  return (
    <div 
      className="card" 
      onClick={onClick}
      style={{
        background: isExpanded ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isExpanded 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        marginBottom: '1rem',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isExpanded ? '1rem' : 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${color} 0%, ${color}90 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            {React.cloneElement(icon, { size: 24 })}
          </div>
          <div>
            <h3 style={{
              margin: 0,
              color: '#1e293b',
              fontSize: '1.125rem',
              fontWeight: 600
            }}>
              {title}
            </h3>
            {!isExpanded && (
              <p style={{
                margin: '0.25rem 0 0',
                color: '#64748b',
                fontSize: '0.875rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {description}
              </p>
            )}
          </div>
        </div>
        {isExpanded ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
      </div>
      
      {isExpanded && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0',
          color: '#475569',
          lineHeight: '1.6'
        }}>
          {description}
        </div>
      )}
    </div>
  );
};

const Procedure = () => {
  const [expandedStep, setExpandedStep] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  const steps = [
    {
      icon: <Database size={24} />,
      title: "Data Collection & Preprocessing",
      description: "We gather comprehensive water quality datasets from multiple sources, including pH levels, dissolved oxygen, turbidity, and various chemical indicators. Our preprocessing pipeline includes data cleaning, normalization, and advanced feature extraction techniques to ensure high-quality input for our models. We handle missing values, remove outliers, and apply feature scaling to standardize the data.",
      color: "#6366f1",
      progress: 100,
      details: [
        "Collected data from 15+ water quality monitoring stations",
        "Preprocessed 50,000+ data points with 98.7% accuracy",
        "Implemented automated data validation and cleaning pipelines",
        "Created feature engineering pipeline with 20+ engineered features"
      ]
    },
    {
      icon: <Brain size={24} />,
      title: "GRU Model Architecture",
      description: "Our advanced GRU (Gated Recurrent Unit) architecture is specifically designed for sequential water quality data. The model includes multiple GRU layers with optimized hyperparameters, batch normalization, and dropout regularization to prevent overfitting. We use a learning rate scheduler and early stopping to ensure optimal training.",
      color: "#8b5cf6",
      progress: 95,
      details: [
        "2-layer GRU architecture with 128 and 64 units respectively",
        "Dropout rate of 0.3 for regularization",
        "Batch normalization between layers for stable training",
        "Learning rate scheduling with Adam optimizer"
      ]
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Training & Validation",
      description: "We employ a rigorous training and validation process using k-fold cross-validation. Our training pipeline includes data augmentation techniques to improve model generalization. We monitor multiple metrics including accuracy, precision, recall, and F1-score to ensure robust model performance across different water quality parameters.",
      color: "#d946ef",
      progress: 90,
      details: [
        "5-fold cross-validation for robust evaluation",
        "Achieved 94.2% validation accuracy",
        "Implemented class weighting for imbalanced datasets",
        "Comprehensive model interpretability analysis"
      ]
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Testing & Deployment",
      description: "After thorough testing, we deploy our model using a scalable microservices architecture. The deployment includes a REST API for real-time predictions, a monitoring dashboard, and automated retraining pipelines. We ensure high availability and low latency for all prediction requests.",
      color: "#ec4899",
      progress: 85,
      details: [
        "REST API with 99.9% uptime",
        "Average prediction latency < 100ms",
        "Automated model retraining pipeline",
        "Real-time monitoring and alerting"
      ]
    }
  ]

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        borderRadius: '16px',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #fff, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          Methodology & Architecture
        </h1>
        <p style={{
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          A comprehensive guide to our GRU-based water quality prediction system
        </p>
      </header>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.5rem'
      }}>
        {['overview', 'architecture', 'performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              color: activeTab === tab ? '#4338ca' : '#64748b',
              position: 'relative',
              transition: 'all 0.2s ease',
              ':hover': {
                color: activeTab === tab ? '#4338ca' : '#475569',
                backgroundColor: activeTab === tab ? '#eef2ff' : '#f1f5f9'
              }
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <div style={{
                position: 'absolute',
                bottom: '-0.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '3px',
                backgroundColor: '#4f46e5',
                borderRadius: '3px'
              }} />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {steps.map((step, index) => (
              <div key={index} className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}90 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: 'white'
                  }}>
                    {React.cloneElement(step.icon, { size: 24 })}
                  </div>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>{step.title}</h3>
                </div>
                <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {step.description}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Progress</span>
                    <span style={{ fontWeight: '600', color: step.color }}>{step.progress}%</span>
                  </div>
                  <ProgressBar percentage={step.progress} color={step.color} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#1e293b',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Layers size={24} color="#4f46e5" />
              Data Flow Pipeline
            </h2>
            <div style={{
              position: 'relative',
              padding: '2rem 0',
              overflow: 'hidden'
            }}>
              {/* Main connection line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50px',
                right: '50px',
                height: '3px',
                background: 'linear-gradient(90deg, #4f46e5, #8b5cf6, #d946ef, #ec4899)',
                zIndex: 1,
                transform: 'translateY(-50%)',
                borderRadius: '3px'
              }} />
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '1rem',
                position: 'relative',
                zIndex: 2
              }}>
                {[
                  { 
                    title: 'Data Collection', 
                    icon: <Database size={20} />, 
                    description: 'Gather raw water quality parameters from multiple sources',
                    color: '#4f46e5',
                    details: ['Sensor data', 'Historical records', 'Environmental factors']
                  },
                  { 
                    title: 'Preprocessing', 
                    icon: <Cpu size={20} />, 
                    description: 'Clean, normalize, and transform data',
                    color: '#7c3aed',
                    details: ['Handle missing values', 'Remove outliers', 'Data normalization']
                  },
                  { 
                    title: 'Feature Engineering', 
                    icon: <Code size={20} />, 
                    description: 'Extract and select relevant features',
                    color: '#a855f7',
                    details: ['Temporal features', 'Statistical features', 'Domain-specific metrics']
                  },
                  { 
                    title: 'Model Training', 
                    icon: <Brain size={20} />, 
                    description: 'Train GRU model with optimization',
                    color: '#d946ef',
                    details: ['GRU architecture', 'Hyperparameter tuning', 'Cross-validation']
                  },
                  { 
                    title: 'Prediction', 
                    icon: <Activity size={20} />, 
                    description: 'Generate water quality insights',
                    color: '#ec4899',
                    details: ['Real-time predictions', 'Confidence scores', 'Anomaly detection']
                  }
                ].map((stage, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    padding: '1rem 0.5rem',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}>
                    {/* Connection dot */}
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: stage.color,
                      border: '3px solid white',
                      boxShadow: '0 0 0 2px ' + stage.color,
                      marginBottom: '1rem',
                      position: 'relative',
                      zIndex: 3
                    }} />
                    
                    {/* Stage card */}
                    <div style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      borderTop: `4px solid ${stage.color}`,
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: `${stage.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: stage.color,
                        fontSize: '24px'
                      }}>
                        {stage.icon}
                      </div>
                      <h4 style={{
                        margin: '0 0 0.5rem',
                        color: '#1e293b',
                        fontSize: '1rem'
                      }}>
                        {stage.title}
                      </h4>
                      <p style={{
                        color: '#64748b',
                        fontSize: '0.85rem',
                        margin: '0 0 0.75rem',
                        minHeight: '40px',
                        lineHeight: '1.4'
                      }}>
                        {stage.description}
                      </p>
                      <div style={{
                        borderTop: '1px dashed #e2e8f0',
                        paddingTop: '0.75rem',
                        marginTop: '0.75rem'
                      }}>
                        {stage.details.map((detail, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#64748b',
                            marginBottom: '0.25rem',
                            ':last-child': {
                              marginBottom: 0
                            }
                          }}>
                            <div style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: stage.color,
                              flexShrink: 0
                            }} />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'architecture' && (
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#1e293b',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Layers size={24} color="#4f46e5" />
            GRU Model Architecture
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div className="card" style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                color: '#4f46e5',
                marginTop: 0,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Layers size={20} />
                Model Architecture
              </h3>
              <div style={{
                background: '#f8fafc',
                borderRadius: '8px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: '1.7',
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <div><span style={{ color: '#3b82f6' }}>Input</span> (None, 24, 10)  # 24 timesteps, 10 features</div>
                <div><span style={{ color: '#3b82f6' }}>GRU</span> (None, 24, 128)  # 128 units, return_sequences=True</div>
                <div><span style={{ color: '#3b82f6' }}>Dropout</span> (None, 24, 128)  # 0.3 rate</div>
                <div><span style={{ color: '#3b82f6' }}>BatchNorm</span> (None, 24, 128)  # Normalization</div>
                <div><span style={{ color: '#3b82f6' }}>GRU</span> (None, 64)  # 64 units</div>
                <div><span style={{ color: '#3b82f6' }}>Dense</span> (None, 64)  # ReLU activation</div>
                <div><span style={{ color: '#3b82f6' }}>Output</span> (None, 5)  # Softmax for 5 classes</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#64748b',
                fontSize: '0.875rem',
                marginTop: '1rem'
              }}>
                <PlayCircle size={16} />
                <span>Total params: 102,405 (400.0 KB)</span>
              </div>
            </div>

            <div className="card" style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                color: '#4f46e5',
                marginTop: 0,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Activity size={20} />
                Training Configuration
              </h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Hyperparameters
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  {[
                    { label: 'Optimizer', value: 'Adam' },
                    { label: 'Learning Rate', value: '1e-3' },
                    { label: 'Batch Size', value: '32' },
                    { label: 'Epochs', value: '100' },
                    { label: 'Loss Function', value: 'Categorical Crossentropy' },
                    { label: 'Metrics', value: 'Accuracy, F1-Score' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: '#f8fafc',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      borderLeft: '3px solid #4f46e5'
                    }}>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginBottom: '0.25rem'
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontWeight: '600',
                        color: '#1e293b'
                      }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Callbacks
                </h4>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  borderLeft: '3px solid #8b5cf6',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}>
                  <div>EarlyStopping(patience=10, restore_best_weights=True)</div>
                  <div>ReduceLROnPlateau(factor=0.5, patience=5)</div>
                  <div>ModelCheckpoint(filepath='best_model.h5')</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              color: '#4f46e5',
              marginTop: 0,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Code size={20} />
              Implementation Details
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  Data Preprocessing
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {[
                    'Min-Max normalization for numerical features',
                    'One-hot encoding for categorical variables',
                    'Handling missing values with interpolation',
                    'Feature scaling and standardization',
                    'Temporal feature engineering',
                    'Outlier detection and handling'
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: '#475569',
                      fontSize: '0.95rem',
                      lineHeight: '1.5'
                    }}>
                      <span style={{ color: '#4f46e5' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  Model Architecture
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {[
                    'Bidirectional GRU layers for sequence learning',
                    'Residual connections for deep networks',
                    'Attention mechanism for important time steps',
                    'Batch normalization between layers',
                    'Dropout for regularization',
                    'Multi-task learning for related predictions'
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: '#475569',
                      fontSize: '0.95rem',
                      lineHeight: '1.5'
                    }}>
                      <span style={{ color: '#4f46e5' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  Deployment
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {[
                    'Containerized with Docker',
                    'REST API with FastAPI',
                    'Asynchronous processing',
                    'Model versioning with MLflow',
                    'Monitoring with Prometheus & Grafana',
                    'Auto-scaling with Kubernetes'
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: '#475569',
                      fontSize: '0.95rem',
                      lineHeight: '1.5'
                    }}>
                      <span style={{ color: '#4f46e5' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'performance' && (
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#1e293b',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <BarChart3 size={24} color="#4f46e5" />
            Model Performance
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { 
                title: 'Accuracy', 
                value: '94.2%', 
                change: '+2.3%', 
                description: 'Overall prediction accuracy across all classes',
                color: '#4f46e5'
              },
              { 
                title: 'Precision', 
                value: '93.8%', 
                change: '+1.9%', 
                description: 'True positives / (True positives + False positives)',
                color: '#8b5cf6'
              },
              { 
                title: 'Recall', 
                value: '92.5%', 
                change: '+2.7%', 
                description: 'True positives / (True positives + False negatives)',
                color: '#d946ef'
              },
              { 
                title: 'F1-Score', 
                value: '93.1%', 
                change: '+2.1%', 
                description: 'Harmonic mean of precision and recall',
                color: '#ec4899'
              },
              { 
                title: 'Inference Time', 
                value: '45ms', 
                change: '-12ms', 
                description: 'Average prediction time per sample',
                color: '#10b981'
              },
              { 
                title: 'Training Time', 
                value: '2h 15m', 
                change: '-35m', 
                description: 'Time to train on full dataset',
                color: '#3b82f6'
              }
            ].map((metric, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    margin: 0,
                    color: '#1e293b',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    {metric.title}
                  </h3>
                  <span style={{
                    background: metric.change.startsWith('+') ? '#dcfce7' : '#fee2e2',
                    color: metric.change.startsWith('+') ? '#16a34a' : '#dc2626',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    {metric.change.startsWith('+') ? '↑' : '↓'} {metric.change}
                  </span>
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: metric.color,
                  margin: '0.5rem 0',
                  lineHeight: '1.2'
                }}>
                  {metric.value}
                </div>
                <p style={{
                  margin: '0.5rem 0 0',
                  color: '#64748b',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              color: '#1e293b',
              marginTop: 0,
              marginBottom: '1.5rem',
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Activity size={20} color="#4f46e5" />
              Performance Over Time
            </h3>
            <div style={{
              height: '300px',
              background: '#f8fafc',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              fontStyle: 'italic'
            }}>
              Performance metrics visualization would be displayed here
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
              gap: '0.75rem'
            }}>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#eef2ff',
                color: '#4f46e5',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                ':hover': {
                  background: '#e0e7ff'
                }
              }}>
                <Download size={16} />
                Export Data
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                ':hover': {
                  background: '#4338ca'
                }
              }}>
                <PlayCircle size={16} />
                Run New Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Procedure
