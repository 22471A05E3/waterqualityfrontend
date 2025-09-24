import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Droplet } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/objectives', label: 'Objectives' },
    { path: '/procedure', label: 'Procedure' },
    { path: '/validation', label: 'Validation' }
  ]

  return (
    <nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(30, 58, 138, 0.95)' : 'rgba(30, 64, 175, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 0',
        transition: 'all 0.3s ease-in-out',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.15)' : 'none'
      }}
    >
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" className="logo" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          fontWeight: '700',
          fontSize: '1.5rem'
        }}>
          <Droplet size={28} style={{ marginRight: '0.5rem', color: '#60a5fa' }} />
          AquaSense
        </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links" style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s ease-in-out',
                    fontWeight: '500',
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: location.pathname === item.path ? '100%' : '0',
                      height: '2px',
                      backgroundColor: '#60a5fa',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              display: 'none',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              transition: 'all 0.2s ease-in-out',
              ':hover': {
                background: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)'
              },
              '@media (max-width: 768px)': {
                display: 'block'
              }
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(30, 58, 138, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            zIndex: 50,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      color: location.pathname === item.path ? '#60a5fa' : 'white',
                      textDecoration: 'none',
                      fontWeight: '500',
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      transition: 'all 0.2s ease',
                      backgroundColor: location.pathname === item.path ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        color: '#60a5fa'
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
  )
}

// Add some global styles for the body to account for the layout
const style = document.createElement('style')
style.textContent = `
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background-color: #f8fafc;
  }
  
  .main-content {
    padding: 1rem 0 3rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`
document.head.appendChild(style)

export default Navbar
