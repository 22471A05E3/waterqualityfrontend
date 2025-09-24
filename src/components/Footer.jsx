import React from 'react'
import { Droplets, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Droplets size={150} color="#667eea" />
              <h3>pH and Turbidity: Multi-Parameter Water Quality 
Monitoring Using Edge-Integrated Sensing 
Platforms 
</h3>
            </div>
            <p>
              Advanced GRU-based Deep Learning Model for Multi-Class Water Quality Classification. 
              Contributing to environmental research and sustainable development.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/objectives">Objectives</a></li>
              <li><a href="/procedure">Procedure</a></li>
              <li><a href="/validation">Validation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Research Areas</h4>
            <ul>
              <li>Deep Learning</li>
              <li>Environmental Monitoring</li>
              <li>Water Quality Assessment</li>
              <li>GRU Neural Networks</li>
              <li>PSI Classification</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <Mail size={16} />
              <span>alajangikeerthisree@gmail.com</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 8885918232</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Narasaraopeta Engineering College</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 Water Quality Prediction Research Project. All rights reserved.</p>
            <p>Developed with passion for Environmental Protection and Public Health</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#research">Research Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
