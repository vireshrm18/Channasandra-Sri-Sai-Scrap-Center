import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Company Brief */}
          <div>
            <Link to="/" className="logo footer-logo" aria-label="Sri Sai Scrap Centre Homepage">
              <Recycle className="logo-icon" />
              <span>Sri Sai Scrap <span style={{ color: 'var(--primary-light)' }}>Centre</span></span>
            </Link>
            <p className="footer-desc">
              <strong>Sri Sai Scrap Centre</strong> — Dealers in all kinds of Scrap Items. Owned & managed by Praveen in Channasandra, Kadugodi Post, Bangalore. Serving domestic and commercial clients with honesty, certified digital scales, and instant payouts.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                ig
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                tw
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Scrap Categories */}
          <div>
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/iron-steel">Iron & Steel Scrap</Link></li>
              <li><Link to="/services/copper-brass-aluminum">Copper & Brass Scrap</Link></li>
              <li><Link to="/services/e-waste">E-Waste Recycling</Link></li>
              <li><Link to="/services/industrial-scrap">Industrial Scrap</Link></li>
              <li><Link to="/services/vehicle-scrap">Vehicle Scrap Buying</Link></li>
              <li><Link to="/services/home-office-pickup">Home & Office Pickup</Link></li>
            </ul>
          </div>

          {/* Contact Information (NAP) */}
          <div>
            <h4 className="footer-title">Get in Touch</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon" />
                <a href="https://goo.gl/maps/FF4eRiN9FBBGNuhd6?g_st=aw" target="_blank" rel="noopener noreferrer" className="hover-link">
                  Channasandra, Kadugodi Post,<br />Bangalore - 560 067 ↗
                </a>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} className="footer-contact-icon" />
                <a href="tel:+918861247315" className="hover-link">Praveen: +91 88612 47315</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} className="footer-contact-icon" />
                <a href="mailto:channasandrasreesaiscrap@gmail.com" className="hover-link" style={{ wordBreak: 'break-all' }}>channasandrasreesaiscrap@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <Clock size={18} className="footer-contact-icon" />
                <span>Mon - Sun: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright and developer credits */}
        <div className="footer-bottom flex-between">
          <p>&copy; {currentYear} Sri Sai Scrap Centre. All Rights Reserved. Dealers in all kinds of Scrap Items.</p>
          <p>
            Designed for Eco-Friendly Disposal & Sustainable Recycling
          </p>
        </div>
      </div>
    </footer>
  );
}
