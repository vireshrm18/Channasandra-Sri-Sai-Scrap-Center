import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Flame, Coins, Cpu, Settings, Home, Truck, 
  CheckCircle2, ArrowRight, ArrowLeft, PhoneCall, HelpCircle, Recycle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

// Map icon names to Lucide icons
const iconMap = {
  Flame: Flame,
  Coins: Coins,
  Cpu: Cpu,
  Settings: Settings,
  Home: Home,
  Truck: Truck
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  
  // Find current service
  const currentService = servicesData.find(service => service.id === id);

  // If service ID is invalid, redirect to all services page
  if (!currentService) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = iconMap[currentService.iconName] || Recycle;

  return (
    <div className="service-detail-container">
      {/* HEADER BREADCRUMB */}
      <section className="detail-header" role="banner">
        <div className="container">
          <div className="detail-breadcrumbs">
            <Link to="/">Home</Link> / <Link to="/services">Services</Link> / {currentService.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <div className="cert-icon-wrapper" style={{ color: 'var(--primary)', padding: '0.5rem' }}>
              <IconComponent size={32} />
            </div>
            <h1>{currentService.title}</h1>
          </div>
        </div>
      </section>

      {/* DETAIL CONTENT GRID */}
      <section className="section">
        <div className="container detail-grid">
          
          {/* Main Content Column */}
          <div className="detail-main-content">
            <div className="detail-image-box">
              <img 
                src={currentService.image} 
                alt={currentService.title} 
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>

            <div className="detail-content">
              <h2>Overview</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                {currentService.longDescription}
              </p>

              <h3>Materials We Accept</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                We accept and recycle the following items under this category. Please ensure materials are segregated where possible to get the best payout rates.
              </p>
              
              <ul style={{ listStyle: 'none' }}>
                {currentService.acceptedMaterials.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 style={{ marginTop: '2.5rem' }}>Our Systematic Recycling Process</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Sai Scrap makes selling your metal recyclables easy and efficient. Here's what to expect:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {currentService.processSteps.map((step, index) => (
                  <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: 'var(--radius-full)', 
                      backgroundColor: 'var(--primary)', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Benefits Card */}
              <div className="card" style={{ marginTop: '3rem', backgroundColor: 'var(--border-light)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Recycle size={20} style={{ color: 'var(--primary)' }} /> Why Choose Sai Scrap?
                </h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {currentService.benefits.map((benefit, index) => (
                    <li key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <span>•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="detail-sidebar" role="complementary">
            {/* Quick Links Widget */}
            <div className="sidebar-widget">
              <h4>All Scrap Services</h4>
              <ul className="sidebar-services-list">
                {servicesData.map(service => (
                  <li 
                    key={service.id} 
                    className={`sidebar-service-item ${service.id === id ? 'active' : ''}`}
                  >
                    <Link to={`/services/${service.id}`}>
                      <span>{service.title.replace(' Buying', '').replace(' Collection', '')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Contact CTA Widget */}
            <div className="sidebar-widget cta-widget">
              <h4>Get an Instant Quote</h4>
              <p>
                Have questions about bulk quantities or today's spot rate? Speak directly with Praveen.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="tel:+918861247315" className="btn btn-accent" style={{ width: '100%' }}>
                  <PhoneCall size={16} /> Call: 8861247315
                </a>
                
                <a 
                  href={`https://wa.me/918861247315?text=Hi%20Sai%20Scrap%20Team,%20I'd%20like%20to%20get%20a%20rate%20estimate%20for%20my%20${currentService.title}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp" 
                  style={{ width: '100%' }}
                >
                  WhatsApp Quote
                </a>

                <Link to="/pickup" className="btn btn-secondary" style={{ width: '100%', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Request Doorstep Pickup
                </Link>
              </div>
            </div>

            {/* Compliance Info */}
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem' }}>
              <HelpCircle size={28} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>We provide safe disposal receipts. Corporate recycling audits supported with full documentation.</span>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}
