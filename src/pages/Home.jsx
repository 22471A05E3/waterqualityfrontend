import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Brain, BarChart3, Target, Activity, Thermometer, Gauge, Droplet } from 'lucide-react'

const Home = () => {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="page-title">pH and Turbidity: Multi-Parameter Water Quality 
Monitoring Using Edge-Integrated Sensing 
Platforms 
</h1>
        <p className="page-subtitle">
          Advanced GRU-based Deep Learning Model for Multi-Class Water Quality Classification
        </p>
        <div className="water-quality-visual" style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          margin: '2rem 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '300px',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            overflow: 'hidden'
          }}>
            {/* Water level indicator */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '70%',
              background: 'linear-gradient(to top, #3b82f6, #60a5fa, #93c5fd)',
              borderRadius: '10px 10px 0 0',
              transition: 'height 1s ease-in-out',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: '1rem',
              color: 'white',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}>
              <Droplet size={32} />
              <span>Water Quality</span>
              <span>Excellent</span>
            </div>
            
            {/* Water quality parameters */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              right: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 2
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '70px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <Thermometer size={20} color="#ef4444" />
                <span style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>pH: 7.2</span>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '70px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <Activity size={20} color="#10b981" />
                <span style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Turbidity: 2.1 NTU</span>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '70px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <Gauge size={20} color="#3b82f6" />
                <span style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>PSI: 25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Droplets size={32} color="#667eea" />
            <h3 style={{ marginLeft: '1rem', marginBottom: 0 }}>Water Quality Analysis</h3>
          </div>
          <p>
            Our system analyzes multiple water quality parameters to predict the Pollution Standard Index (PSI) 
            levels, helping in environmental monitoring and public health protection.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Brain size={32} color="#667eea" />
            <h3 style={{ marginLeft: '1rem', marginBottom: 0 }}>GRU Deep Learning</h3>
          </div>
          <p>
            Utilizing Gated Recurrent Unit (GRU) neural networks for accurate time-series prediction 
            and classification of water quality parameters with high precision.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <BarChart3 size={32} color="#667eea" />
            <h3 style={{ marginLeft: '1rem', marginBottom: 0 }}>Real-time Validation</h3>
          </div>
          <p>
            Interactive validation system allowing users to upload datasets and get instant 
            predictions with accuracy metrics and detailed analysis results.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Target size={32} color="#667eea" />
            <h3 style={{ marginLeft: '1rem', marginBottom: 0 }}>Research Impact</h3>
          </div>
          <p>
            Contributing to environmental research and sustainable development through 
            advanced machine learning techniques for water quality monitoring.
          </p>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link to="/validation" className="btn" style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            background: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.3)'
          }}>
            <Activity size={20} />
            Try Water Quality Prediction
          </Link>
          <Link to="/about" className="btn btn-secondary" style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            background: 'white',
            border: '2px solid #3b82f6',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Brain size={20} />
            Learn About Our Research
          </Link>
        </div>
        <p style={{
          marginTop: '1rem',
          color: '#6b7280',
          fontSize: '0.9rem',
          maxWidth: '600px'
        }}>
          Our advanced GRU-based model provides accurate water quality predictions to support environmental monitoring and public health initiatives.
        </p>
      </div>
    </div>
  )
}

export default Home
