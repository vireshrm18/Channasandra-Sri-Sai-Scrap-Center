import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatButtons from './components/FloatButtons';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ServiceDetailPage from './pages/ServiceDetail';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import PickupPage from './pages/Pickup';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* Navigation Header */}
        <Header />
        
        {/* Main Routing Views */}
        <main className="main-content" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pickup" element={<PickupPage />} />
            
            {/* Catch-all route to redirect back to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Floating Call & WhatsApp Widgets */}
        <FloatButtons />
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
