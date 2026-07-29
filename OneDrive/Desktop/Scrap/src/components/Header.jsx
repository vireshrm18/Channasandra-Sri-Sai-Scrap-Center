import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Recycle, Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header" role="banner">
      <div className="container nav-container">
        {/* Brand Logo */}
        <NavLink to="/" className="logo" onClick={closeMenu} aria-label="Sri Sai Scrap Centre Homepage">
          <Recycle className="logo-icon animate-spin-slow" />
          <span>Sri Sai Scrap <span className="text-gradient">Centre</span></span>
        </NavLink>

        {/* Mobile Navigation Toggle */}
        <button 
          className="nav-toggle" 
          onClick={toggleMenu} 
          aria-expanded={isOpen} 
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav id="primary-navigation" className={`nav-links ${isOpen ? 'open' : ''}`} role="navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About Us
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact Us
          </NavLink>
          
          {/* Action CTA Button */}
          <NavLink 
            to="/pickup" 
            className="btn btn-primary" 
            onClick={closeMenu}
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
          >
            Request Pickup
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
