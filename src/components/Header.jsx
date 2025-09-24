import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      padding: '1.25rem 0 0.5rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 900,
      marginBottom: '0.15rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h1 style={{ 
          margin: '0 0 0.1rem', 
          fontSize: '1.75rem',
          fontWeight: '700',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.15)'
        }}>
          pH and Turbidity
        </h1>
        <p style={{ 
          margin: '0.1rem 0 0', 
          fontSize: '1rem',
          opacity: '0.95',
          fontWeight: '400'
        }}>
          Multi-Parameter Water Quality Monitoring
        </p>
        <p style={{
          margin: '0.05rem 0 0',
          fontSize: '0.85rem',
          opacity: '0.9',
          fontStyle: 'italic'
        }}>
          Using Edge-Integrated Sensing Platforms
        </p>
      </div>
    </header>
  );
};

export default Header;
