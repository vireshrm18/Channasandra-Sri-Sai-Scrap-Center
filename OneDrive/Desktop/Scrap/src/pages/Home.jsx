import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, Coins, Cpu, Settings, Home, Truck, 
  CheckCircle, ArrowRight, ShieldCheck, TruckIcon, CreditCard, Sparkles, Star, Users, Award, Recycle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import VisitingCard from '../components/VisitingCard';

// Map icon strings to Lucide components
const iconMap = {
  Flame: Flame,
  Coins: Coins,
  Cpu: Cpu,
  Settings: Settings,
  Home: Home,
  Truck: Truck
};

export default function HomePage() {
  // Take first 3 services for home display
  const featuredServices = servicesData.slice(0, 3);

  // Trust badges details
  const trustSignals = [
    { icon: <ShieldCheck className="trust-icon" />, text: "Licensed Scrap Buyer" },
    { icon: <CreditCard className="trust-icon" />, text: "Instant On-the-spot Payout" },
    { icon: <TruckIcon className="trust-icon" />, text: "Free Doorstep Pickup" },
    { icon: <CheckCircle className="trust-icon" />, text: "100% Accurate Digital Scales" }
  ];

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero section" aria-label="Welcome to Sri Sai Scrap Centre">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Dealers in all kinds of Scrap Items</span>
            </div>
            <h1>
              <span className="text-gradient">SRI SAI SCRAP CENTRE</span> — Dealers in All Scrap Items
            </h1>
            <p>
              Managed by <strong>Praveen</strong> in Channasandra, Kadugodi Post, Bangalore. We offer the best market rates, certified digital weighing, free doorstep pickup, and eco-friendly scrap recycling for paper, metal, wood, plastic, e-waste, and scrap vehicles.
            </p>
            
            <div className="hero-ctas">
              <Link to="/pickup" className="btn btn-primary">
                Schedule Free Pickup <ArrowRight size={18} />
              </Link>
              <a href="tel:+918861247315" className="btn btn-secondary">
                Call Praveen: 8861247315
              </a>
              <a 
                href="https://wa.me/918861247315?text=Hi%20Praveen,%20I'd%20like%20to%20get%20a%20rate%20quote%20for%20my%20scrap%20items." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
              >
                WhatsApp Chat
              </a>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              {trustSignals.map((badge, idx) => (
                <div key={idx} className="trust-badge">
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-img-container">
            <div className="hero-image" style={{ border: '3px solid var(--primary-light)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              <img 
                src="/shop-front.jpg" 
                alt="Channasandra Sri Sai Scrap Center Shop Front - Owner Praveen 8861247315" 
                width="800" 
                height="600"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '0.6rem 1rem', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                📍 Real Shop Yard: Channasandra, Kadugodi Post, Bangalore
              </div>
            </div>
            <div className="hero-stats-card">
              <div className="hero-stats-icon">
                <Recycle size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>Real Shop Yard</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>All Types of Scrap Bought & Sold</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP FRONT FEATURE SHOWCASE SECTION */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Visit Our Location</span>
            <h2>Our Physical Scrap Yard & Shop Front</h2>
            <p className="section-desc">
              Located in Channasandra, Kadugodi Post, Bangalore. Equipped with calibrated digital scales, heavy loading auto-loaders, and dedicated scrap segregation bays.
            </p>
          </div>

          <div className="card" style={{ border: '2px solid var(--primary-light)', overflow: 'hidden', padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 0, alignItems: 'center' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '320px' }}>
                <img 
                  src="/shop-front.jpg" 
                  alt="Channasandra Sri Sai Scrap Center Physical Location - Praveen 8861247315" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2.5rem' }}>
                <div className="visiting-card-badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--primary)' }}>
                  ✓ Official Shop Location
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  CHANNASANDRA SRI SAI SCRAP CENTER
                </h3>
                <p style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
                  ALL TYPES OF SCRAP BOUGHT & SOLD — PLASTIC, METAL, PAPER, BATTERIES
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Visit our yard in person or book a pickup. We measure materials directly on certified digital scales in front of you for total transparency and instant payment.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="tel:+918861247315" className="btn btn-primary">
                    Call Praveen: 8861247315
                  </a>
                  <a 
                    href="https://wa.me/918861247315?text=Hi%20Praveen,%20I'd%20like%20to%20visit%20the%20shop%20in%20Channasandra." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-whatsapp"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISITING CARD SHOWCASE SECTION */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <VisitingCard />
        </div>
      </section>

      {/* WHY CHOOSE US STATS */}
      <section className="section section-bg">
        <div className="container">
          <div className="grid-3" style={{ textAlign: 'center' }}>
            <div className="card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
              <div className="flex-center" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <Award size={48} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>20+ Years</h3>
              <p style={{ color: 'var(--text-muted)' }}>Trustworthy industry presence in Karnataka</p>
            </div>
            <div className="card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
              <div className="flex-center" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <Users size={48} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>15,000+</h3>
              <p style={{ color: 'var(--text-muted)' }}>Satisfied domestic and industrial clients</p>
            </div>
            <div className="card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
              <div className="flex-center" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <CheckCircle size={48} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>100% Green</h3>
              <p style={{ color: 'var(--text-muted)' }}>Certified safe disposal and zero landfill recycling</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">What We Recycle</span>
            <h2>Our Specialized Scrap Services</h2>
            <p className="section-desc">
              We provide clean, safe collection and recycling services for all types of scrap materials. Select a category below to learn more about our process.
            </p>
          </div>

          <div className="grid-3">
            {servicesData.map((service) => {
              const IconComponent = iconMap[service.iconName] || Recycle;
              return (
                <div key={service.id} className="card service-card">
                  <div className="service-img-wrapper">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="service-img"
                      loading="lazy"
                    />
                    <div className="service-icon-floating">
                      <IconComponent size={24} />
                    </div>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <Link to={`/services/${service.id}`} className="link-btn">
                    Read Details <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-secondary">
              View All Scrap Categories
            </Link>
          </div>
        </div>
      </section>

      {/* RECYCLING VALUES / HOW IT WORKS */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Simple & Transparent</span>
            <h2>How Our Pickup Process Works</h2>
            <p className="section-desc">
              Get rid of your scrap in three easy steps. We handle all the heavy lifting and sorting.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '6rem', fontWeight: 900, color: 'var(--border-light)', 
                zIndex: 1, pointerEvents: 'none'
              }}>1</div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>1. Request a Quote</h4>
                <p style={{ color: 'var(--text-muted)' }}>
                  Fill out our online pickup form, message us on WhatsApp, or make a quick call. Provide a brief description of the type and volume of scrap you have.
                </p>
              </div>
            </div>

            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '6rem', fontWeight: 900, color: 'var(--border-light)', 
                zIndex: 1, pointerEvents: 'none'
              }}>2</div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>2. Digital Weighing</h4>
                <p style={{ color: 'var(--text-muted)' }}>
                  Our professional team arrives at your location at the scheduled time. We weigh your materials in front of you using our certified, highly accurate digital scales.
                </p>
              </div>
            </div>

            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '6rem', fontWeight: 900, color: 'var(--border-light)', 
                zIndex: 1, pointerEvents: 'none'
              }}>3</div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>3. Instant Payout</h4>
                <p style={{ color: 'var(--text-muted)' }}>
                  Get paid immediately on completion of loading. We support Cash, GPay, PhonePe, and instant bank transfers, providing a clear receipt for your transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT RATES INQUIRY SECTION */}
      <section className="section">
        <div className="container">
          <div className="pricing-info-card">
            <div className="pricing-info-text">
              <h3>Need Today's Scrap Rate Quote?</h3>
              <p>Call or WhatsApp Praveen directly for the latest daily market rates for metals, e-waste, paper, and scrap items.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:+918861247315" className="btn btn-accent">
                Call Praveen: 8861247315
              </a>
              <a 
                href="https://wa.me/918861247315?text=Hi%20Praveen,%20please%20send%20me%20today's%20scrap%20rate%20quote." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
              >
                WhatsApp Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Client Reviews</span>
            <h2>What Our Customers Say</h2>
            <p className="section-desc">
              We take pride in our service quality. Read feedback from our satisfied residential, commercial, and industrial clients in Bengaluru.
            </p>
          </div>

          <div className="testimonial-swiper">
            <div className="card testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "Sai Scrap team did an excellent job clearing out old metal racks and e-waste from our office in ITPL area. They were quick, professional, and weighed everything in front of us on a digital scale. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div>
                  <h4 className="author-name">Ramanand Gowda</h4>
                  <p className="author-role">Admin Manager, Tech Solutions</p>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "I sold an old Maruti Suzuki car that was lying unused for scrap. Praveen and his team handled the towing and provided the cut chassis plate. They also guided me through the RTO deregistrations. Excellent service and clean deal."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">V</div>
                <div>
                  <h4 className="author-name">Vinayak Hegde</h4>
                  <p className="author-role">Resident, Channasandra</p>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "We have a regular monthly industrial scrap clearance contract with Sai Scrap for our manufacturing unit. Their rates are consistently the best in Channasandra, and they are fully compliant with environmental regulations."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">K</div>
                <div>
                  <h4 className="author-name">Karthik A.</h4>
                  <p className="author-role">Plant Head, Precision Component India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--primary-dark) 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Ready to Recycle & Earn?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            Get a free quote today! Whether it's a small bag of household newspapers or metric tons of industrial metal scrap, we support pickups of all sizes.
          </p>
          <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/pickup" className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Book Doorstep Pickup
            </Link>
            <a href="tel:+918861247315" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '1rem 2rem' }}>
              Call 8861247315
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
