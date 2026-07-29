import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, Coins, Cpu, Settings, Home, Truck, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Recycle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

// Map icon strings to Lucide components
const iconMap = {
  Flame: Flame,
  Coins: Coins,
  Cpu: Cpu,
  Settings: Settings,
  Home: Home,
  Truck: Truck
};

export default function ServicesPage() {
  const materialsList = [
    { name: "Iron & Cast Iron", category: "Ferrous" },
    { name: "Steel & Rebars", category: "Ferrous" },
    { name: "Copper Cables & Wires", category: "Non-Ferrous" },
    { name: "Brass Taps & Fittings", category: "Non-Ferrous" },
    { name: "Aluminum Frames & Alloy", category: "Non-Ferrous" },
    { name: "Lead Acid Batteries", category: "Batteries" },
    { name: "Computers & Motherboards", category: "E-Waste" },
    { name: "Air Conditioners", category: "Appliances" },
    { name: "Cardboards & Newspapers", category: "Paper" },
    { name: "PET Bottles & Drums", category: "Plastic" },
    { name: "Junk Cars & Motorcycles", category: "Vehicles" },
    { name: "Industrial Machineries", category: "Industrial" }
  ];

  return (
    <div className="services-container">
      {/* PAGE HEADER */}
      <section className="detail-header" role="banner">
        <div className="container">
          <div className="detail-breadcrumbs">Home / Our Services</div>
          <h1>Our Scrap Recycling Services</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
            We buy and process all grades of scrap metal, electronic items, and industrial wastes in Bengaluru.
          </p>
        </div>
      </section>

      {/* DETAILED SERVICES LISTING */}
      <section className="section">
        <div className="container">
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
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>Accepted Items:</h4>
                    <ul style={{ listStyle: 'none', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {service.acceptedMaterials.slice(0, 3).map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                          <ChevronRight size={12} style={{ color: 'var(--primary)' }} />
                          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item}</span>
                        </li>
                      ))}
                      {service.acceptedMaterials.length > 3 && (
                        <li style={{ fontStyle: 'italic', fontSize: '0.75rem', paddingLeft: '0.75rem', marginTop: '0.25rem' }}>
                          + {service.acceptedMaterials.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>

                  <Link to={`/services/${service.id}`} className="link-btn">
                    Read Details & Pricing <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MATERIALS ACCEPTED SECTION */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Comprehensive List</span>
            <h2>Materials We Accept</h2>
            <p className="section-desc">
              We accept a wide range of recyclables. Turn your home, office, or factory scrap into profit.
            </p>
          </div>

          <div className="grid-4">
            {materialsList.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ 
                  alignSelf: 'flex-start', 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                  color: 'var(--primary)', 
                  padding: '0.15rem 0.4rem', 
                  borderRadius: 'var(--radius-sm)'
                }}>
                  {item.category}
                </span>
                <h4 style={{ fontSize: '1rem', marginTop: '0.25rem' }}>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={12} />
                  <span>Free Pickup Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECO-FACT */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="cert-icon-wrapper" style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
            <Recycle size={48} />
          </div>
          <h2>Our Eco-Friendly Disposal Guarantee</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem', marginBottom: '2.5rem' }}>
            We work strictly with certified hazardous waste handlers and authorized metal smelters. When you sell your e-waste, lead-acid batteries, or metals to Sai Scrap, you receive full compliance certificates ensuring they will never end up polluting local lakes or landfills.
          </p>
          <div className="flex-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/pickup" className="btn btn-primary">
              Schedule Your Pickup
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Ask about Commercial Demolition
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
