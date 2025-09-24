import React from 'react'
import { CheckCircle } from 'lucide-react'

const Objectives = () => {
  const objectives = [
    {
      title: "Develop Advanced GRU Model",
      description: "Design and implement a sophisticated Gated Recurrent Unit neural network architecture optimized for water quality prediction tasks."
    },
    {
      title: "Multi-Parameter Analysis",
      description: "Integrate multiple water quality parameters including pH, dissolved oxygen, turbidity, and chemical indicators for comprehensive assessment."
    },
    {
      title: "Real-time Prediction System",
      description: "Create a responsive web-based system that provides instant water quality predictions and classifications."
    },
    {
      title: "High Accuracy Classification",
      description: "Achieve superior accuracy in PSI level classification through advanced deep learning techniques and optimization."
    },
    {
      title: "Scalable Architecture",
      description: "Develop a scalable solution that can handle large datasets and be deployed for real-world environmental monitoring."
    },
    {
      title: "User-Friendly Interface",
      description: "Design an intuitive interface that allows researchers and environmental professionals to easily interact with the prediction system."
    },
    {
      title: "Validation and Testing",
      description: "Implement comprehensive validation mechanisms to ensure model reliability and performance across different datasets."
    },
    {
      title: "Research Contribution",
      description: "Contribute to the scientific community by advancing the state-of-the-art in environmental informatics and water quality assessment."
    }
  ]

  return (
    <div className="page-container">
      <h1 className="page-title">Research Objectives</h1>
      <p className="page-subtitle">Key Goals and Targets of Our Water Quality Prediction Research</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {objectives.map((objective, index) => (
          <div key={index} className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <CheckCircle size={24} color="#667eea" style={{ marginRight: '1rem', marginTop: '0.2rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{objective.title}</h3>
                <p style={{ margin: 0, color: '#666' }}>{objective.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Expected Outcomes</h3>
        <p>
          Upon completion of this research, we expect to deliver a robust, accurate, and user-friendly 
          water quality prediction system that can be utilized by environmental agencies, research 
          institutions, and water management authorities. The system will provide reliable PSI 
          classifications and contribute to better water quality monitoring and environmental protection.
        </p>
      </div>
    </div>
  )
}

export default Objectives
