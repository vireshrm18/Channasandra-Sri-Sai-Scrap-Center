import React, { useState } from 'react';
import { Phone, MapPin, User, CheckCircle, ZoomIn, X, Image as ImageIcon } from 'lucide-react';

export default function VisitingCard({ compact = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="visiting-card-card">
      <div className="visiting-card-badge">
        <CheckCircle size={16} /> Official Visiting Card & Business Reference
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
        {/* Card Image Display */}
        <div className="visiting-card-wrapper" onClick={() => setIsOpen(true)} title="Click to enlarge visiting card">
          <img 
            src="/visiting-card.jpg" 
            alt="Sri Sai Scrap Centre Visiting Card - Praveen, 8861247315, Channasandra Kadugodi Post Bangalore 560067" 
            className="visiting-card-img"
          />
          <div className="visiting-card-zoom-hint">
            <ZoomIn size={16} /> View Full Card
          </div>
        </div>

        {/* Card Details Text */}
        <div>
          <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-title)', fontWeight: 800 }}>
            SRI SAI SCRAP CENTRE
          </h3>
          <p style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>
            Dealers in all kinds of Scrap Items
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-dark)', flexShrink: 0 }}>
                <User size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Proprietor</span>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Praveen</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <Phone size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Phone / WhatsApp</span>
                <a href="tel:+918861247315" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                  8861247315
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(15, 118, 110, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', flexShrink: 0 }}>
                <MapPin size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Store Address</span>
                <a href="https://goo.gl/maps/FF4eRiN9FBBGNuhd6?g_st=aw" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'underline' }}>
                  Channasandra, Kadugodi Post, Bangalore - 560 067 ↗
                </a>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="tel:+918861247315" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
              <Phone size={16} /> Call Praveen
            </a>
            <a 
              href="https://wa.me/918861247315?text=Hi%20Praveen,%20I'm%20contacting%20you%20from%20Sri%20Sai%20Scrap%20Centre%20website." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setIsOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Close visiting card preview"
            >
              <X size={32} />
            </button>
            <img 
              src="/visiting-card.jpg" 
              alt="Sri Sai Scrap Centre Visiting Card Full Size" 
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <h3>Sri Sai Scrap Centre - Official Visiting Card</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>
                Praveen | Contact: 8861247315 | Channasandra, Kadugodi Post, Bangalore - 560 067
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
