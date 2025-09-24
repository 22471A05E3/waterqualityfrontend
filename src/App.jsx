import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Objectives from './pages/Objectives';
import Procedure from './pages/Procedure';
import Validation from './pages/Validation';
import Results from './pages/Results';

function App() {
  const location = useLocation();
  
  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '0 0 auto' }}>
        <Header />
        {!location.pathname.startsWith('/results') && <Navbar />}
      </div>
      <main className="main-content" style={{ flex: '1 0 auto', width: '100%' }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/procedure" element={<Procedure />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
