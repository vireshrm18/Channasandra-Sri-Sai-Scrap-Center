import React from 'react';
import { Shield, ShieldAlert, Award, FileText, CheckCircle2, Heart, Recycle, Users } from 'lucide-react';
import VisitingCard from '../components/VisitingCard';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <CheckCircle2 size={32} style={{ color: 'var(--primary)' }} />,
      title: "Fair & Honest Weight",
      desc: "We use certified digital weighing scales checked and approved by standard agencies, ensuring you receive the exact payment for every single gram of your material."
    },
    {
      icon: <Recycle size={32} style={{ color: 'var(--primary)' }} />,
      title: "Eco-Friendly Processing",
      desc: "Our mission is zero-landfill disposal. We segregate all metals, plastics, paper, wood, and electronic materials for specialized environment-safe smelting and recycling."
    },
    {
      icon: <Heart size={32} style={{ color: 'var(--primary)' }} />,
      title: "Customer-First Service",
      desc: "From quick phone call responses to free on-site loading and clean-up, we aim to make the scrap disposal process easy, quick, and profitable for you."
    }
  ];

  const certificates = [
    {
      title: "Licensed Scrap Dealer",
      issuer: "Local Municipal & Environmental Standards",
      desc: "Official authorization to collect, store, and process all categories of scrap materials."
    },
    {
      title: "Certified Digital Weighing",
      issuer: "Weights & Measures Compliance",
      desc: "Calibrated digital scales ensuring 100% accurate measurement for maximum payouts."
    },
    {
      title: "Eco-Friendly Disposal Partner",
      issuer: "Sustainable Waste Management Guidelines",
      desc: "Authorized dismantling and safe recycling of paper, plastic, metal, e-waste, and scrap vehicles."
    }
  ];

  return (
    <div className="about-container">
      {/* PAGE HEADER */}
      <section className="detail-header" role="banner">
        <div className="container">
          <div className="detail-breadcrumbs">Home / About Us</div>
          <h1>About Sri Sai Scrap Centre</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
            Dealers in all kinds of Scrap Items | Proprietor: Praveen | Channasandra, Kadugodi Post, Bangalore - 560 067
          </p>
        </div>
      </section>

      {/* VISITING CARD SHOWCASE */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <VisitingCard />
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="section">
        <div className="container about-grid">
          <div>
            <img 
              src="/shop-front.jpg" 
              alt="Channasandra Sri Sai Scrap Center Shop Front & Yard" 
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '2px solid var(--primary-light)' }}
            />
          </div>
          <div className="about-content">
            <span className="section-subtitle">Our Journey</span>
            <h2>Dealers in All Kinds of Scrap Items</h2>
            <p className="about-p">
              Owned and operated by <strong>Praveen</strong> at <strong>Channasandra, Kadugodi Post, Bangalore - 560 067</strong>, Sri Sai Scrap Centre has earned a reputation for honesty, transparency, and instant payouts.
            </p>
            <p className="about-p">
              We specialize in buying and recycling all types of scrap items, including iron, steel, copper, brass, aluminum, newspapers, cardboard boxes, plastic items, wood waste, e-waste, and end-of-life vehicle scrap.
            </p>
            
            {/* Stats list */}
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-num">20+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">15k+</div>
                <div className="stat-label">Clients Satisfied</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">100%</div>
                <div className="stat-label">Safe & Green Disposal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">How We Work</span>
            <h2>Our Core Operating Values</h2>
            <p className="section-desc">
              We build long-term relationships with our clients through honesty, reliability, and care for the planet.
            </p>
          </div>

          <div className="grid-3">
            {coreValues.map((val, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="cert-icon-wrapper" style={{ marginBottom: '1.5rem' }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{val.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSES & CERTIFICATIONS */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Compliance & Safety</span>
            <h2>Licensed & Fully Certified Scrap Dealer</h2>
            <p className="section-desc">
              We operate under strict environmental mandates. Our business complies with all local municipality regulations and national recycling protocols.
            </p>
          </div>

          <div className="cert-grid">
            {certificates.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-icon-wrapper">
                  <Award size={28} />
                </div>
                <h4>{cert.title}</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{cert.issuer}</p>
                <p style={{ fontSize: '0.85rem' }}>{cert.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '3.5rem',
            padding: '2rem',
            backgroundColor: 'var(--accent-light)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '5px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <Shield size={40} style={{ color: 'var(--accent-dark)', flexShrink: 0 }} />
            <div style={{ flexGrow: 1 }}>
              <h4 style={{ color: 'var(--accent-dark)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Corporate Compliance Support</h4>
              <p style={{ color: 'var(--accent-dark)', fontSize: '0.9rem', opacity: 0.9 }}>
                Need documentation for green auditing, corporate e-waste clearances, or scrap vehicle scrapping certificates? We provide all certified receipts, destruction documentation, and RTO guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
