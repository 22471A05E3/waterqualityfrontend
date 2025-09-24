import React, { useState } from 'react';
import { Users, Clock, Award, Code, BarChart2, Shield, Globe, Layers, Zap, Clock as ClockIcon, CheckCircle, Database } from 'lucide-react';

const TeamMember = ({ name, role, expertise, avatar }) => (
  <div style={{
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  }}>
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: '#e0f2fe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
      fontSize: '2rem',
      color: '#0369a1',
      fontWeight: 'bold'
    }}>
      {avatar}
    </div>
    <h4 style={{ margin: '0.5rem 0', textAlign: 'center', color: '#1e293b' }}>{name}</h4>
    <p style={{ color: '#3b82f6', textAlign: 'center', margin: '0 0 0.5rem', fontWeight: '600' }}>{role}</p>
    <p style={{ color: '#64748b', textAlign: 'center', fontSize: '0.9rem' }}>{expertise}</p>
  </div>
);

const TimelineItem = ({ year, title, description, icon: Icon, isLast }) => (
  <div style={{ display: 'flex', marginBottom: isLast ? 0 : '2rem' }}>
    <div style={{ 
      marginRight: '1.5rem',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: '#e0f2fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0369a1',
        zIndex: 2
      }}>
        <Icon size={24} />
      </div>
      {!isLast && <div style={{
        position: 'absolute',
        top: '50px',
        bottom: '-2rem',
        width: '2px',
        background: '#e2e8f0',
        zIndex: 1
      }} />}
    </div>
    <div style={{ flex: 1, paddingBottom: '1rem' }}>
      <div style={{ 
        background: '#f8fafc',
        padding: '1.25rem',
        borderRadius: '8px',
        borderLeft: '4px solid #3b82f6'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '0.5rem' 
        }}>
          <span style={{
            background: '#dbeafe',
            color: '#1d4ed8',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <ClockIcon size={14} />
            {year}
          </span>
        </div>
        <h4 style={{ 
          margin: '0.5rem 0', 
          color: '#1e293b',
          fontSize: '1.125rem'
        }}>{title}</h4>
        <p style={{ 
          color: '#64748b', 
          margin: 0,
          lineHeight: '1.6'
        }}>{description}</p>
      </div>
    </div>
  </div>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Layers size={18} /> },
    { id: 'team', label: 'Our Team', icon: <Users size={18} /> },
    { id: 'timeline', label: 'Project Timeline', icon: <Clock size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={18} /> }
  ];

  const teamMembers = [
    { 
      name: 'Alajangi Keerthisree', 
      role: 'Team Leader',
      expertise: 'Java Full Stack',
      avatar: 'AK'
    },
    { 
      name: 'Katari Thanmai', 
      role: 'TeamMate 1',
      expertise: 'Data Analysis',
      avatar: 'KT'
    },
    { 
      name: 'Sonti Vineela', 
      role: 'TeamMate 2',
      expertise: 'Java FullStack',
      avatar: 'SV'
    },
    { 
      name: 'Mothe Suneetha', 
      role: 'Guide',
      expertise: 'Teaching',
      avatar: 'MS'
    }
  ];

  const timelineData = [
    {
      year: '2023 Q1',
      title: 'Research Initiation',
      description: 'Initial research on water quality parameters and machine learning applications in environmental monitoring.',
      icon: Code
    },
    {
      year: '2023 Q2',
      title: 'Data Collection',
      description: 'Gathered comprehensive water quality datasets from multiple sources and performed initial data cleaning.',
      icon: Database
    },
    {
      year: '2023 Q3',
      title: 'Model Development',
      description: 'Developed and trained the GRU model with advanced feature engineering and hyperparameter tuning.',
      icon: BarChart2
    },
    {
      year: '2023 Q4',
      title: 'Web Application',
      description: 'Built the interactive web interface for real-time water quality prediction and visualization.',
      icon: Globe
    },
    {
      year: '2024 Q1',
      title: 'Deployment',
      description: 'Successfully deployed the model and application for public access and testing.',
      icon: Zap
    }
  ];

  const achievements = [
    {
      title: 'Model Accuracy',
      value: '98.5%',
      description: 'Achieved in water quality classification',
      icon: <BarChart2 size={24} />
    },
    {
      title: 'Processing Speed',
      value: '< 2s',
      description: 'Average prediction time',
      icon: <Zap size={24} />
    },
    {
      title: 'Parameters Monitored',
      value: '15+',
      description: 'Water quality parameters',
      icon: <Layers size={24} />
    },
    {
      title: 'Data Security',
      value: '100%',
      description: 'Secure data handling',
      icon: <Shield size={24} />
    }
  ];
  return (
    <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          About Our Research
        </h1>
        <p className="page-subtitle" style={{ 
          fontSize: '1.125rem', 
          color: '#64748b',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Pioneering the future of water quality monitoring through advanced machine learning and environmental science
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === tab.id ? '#eff6ff' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
              color: activeTab === tab.id ? '#1e40af' : '#64748b',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '6px 6px 0 0',
              transition: 'all 0.2s ease',
              ':hover': {
                background: activeTab === tab.id ? '#eff6ff' : '#f8fafc',
                color: activeTab === tab.id ? '#1e40af' : '#475569'
              }
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div className="card" style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                color: '#1e293b',
                marginTop: 0,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Layers size={24} />
                Project Overview
              </h3>
              <p style={{ 
                color: '#475569',
                lineHeight: '1.8',
                marginBottom: '1.5rem',
                fontSize: '1.05rem'
              }}>
                Water quality assessment is crucial for environmental monitoring and public health protection. 
                Our research presents an advanced deep learning approach using Gated Recurrent Unit (GRU) 
                neural networks for multi-class water quality prediction based on the Pollution Standard Index (PSI).
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                margin: '2rem 0'
              }}>
                {achievements.map((item, index) => (
                  <div key={index} style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#e0f2fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      color: '#0369a1'
                    }}>
                      {item.icon}
                    </div>
                    <h4 style={{ 
                      margin: '0.5rem 0',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1e40af'
                    }}>{item.value}</h4>
                    <p style={{ 
                      margin: '0.25rem 0',
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>{item.title}</p>
                    <p style={{ 
                      margin: '0.25rem 0 0',
                      color: '#64748b',
                      fontSize: '0.9rem'
                    }}>{item.description}</p>
                  </div>
                ))}
              </div>

              <h4 style={{ 
                color: '#1e293b',
                margin: '2rem 0 1rem',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={20} color="#10b981" />
                Research Impact
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '1rem'
              }}>
                {[
                  'Advanced deep learning techniques for water quality assessment',
                  'Real-time prediction capabilities for environmental monitoring',
                  'Scalable solution for large-scale water quality management',
                  'Integration of multiple water quality parameters',
                  'Support for decision-making in water treatment',
                  'Open-source framework for community contribution'
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#dbeafe',
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#2563eb',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                    <p style={{ 
                      margin: 0,
                      color: '#475569',
                      lineHeight: '1.6'
                    }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#1e293b',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Users size={24} />
              Meet Our Team
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem'
            }}>
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#1e293b',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Clock size={24} />
              Project Timeline
            </h3>
            <div style={{ marginTop: '1.5rem' }}>
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index}
                  {...item}
                  isLast={index === timelineData.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#1e293b',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Award size={24} />
              Our Achievements
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem'
            }}>
              {achievements.map((achievement, index) => (
                <div key={index} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderLeft: '4px solid #3b82f6',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: '#0369a1'
                  }}>
                    {achievement.icon}
                  </div>
                  <h4 style={{ 
                    margin: '0.5rem 0',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: '#1e40af',
                    lineHeight: '1.2'
                  }}>{achievement.value}</h4>
                  <p style={{ 
                    margin: '0.5rem 0',
                    fontWeight: '600',
                    color: '#1e293b',
                    fontSize: '1.1rem'
                  }}>{achievement.title}</p>
                  <p style={{ 
                    margin: '0.25rem 0 0',
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default About
