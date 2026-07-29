import React, { useState } from 'react';
import { X, ZoomIn, Eye } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);

  const galleryItems = [
    {
      id: "shop-front",
      title: "Channasandra Sri Sai Scrap Center - Shop Front & Yard",
      category: "facility",
      image: "/shop-front.jpg",
      desc: "Our main scrap yard in Channasandra, Kadugodi Post. Owner: Praveen | 8861247315. All types of scrap bought & sold."
    },
    {
      id: "visiting-card",
      title: "Official Visiting Card & Shop Reference",
      category: "card",
      image: "/visiting-card.jpg",
      desc: "Sri Sai Scrap Centre - Praveen | 8861247315 | Channasandra, Kadugodi Post, Bangalore - 560 067. Dealers in all kinds of Scrap Items."
    },
    {
      id: "img-iron-steel",
      title: "Iron & Steel Scrap Materials",
      category: "materials",
      image: "/iron-steel-scrap.png",
      desc: "Structural steel rebars, iron gears, springs, and heavy cast iron scrap materials."
    },
    {
      id: "img-copper-brass",
      title: "Copper, Brass & Aluminum Scrap",
      category: "materials",
      image: "/copper-brass-aluminum-scrap.png",
      desc: "Copper cables, brass fittings, taps, and aluminum sheets/alloy extrusions."
    },
    {
      id: "img-ewaste",
      title: "E-Waste & Electronics Scrap",
      category: "materials",
      image: "/e-waste-scrap.png",
      desc: "Circuit boards, motherboards, computers, household electronic scrap, and appliances."
    },
    {
      id: "img-industrial",
      title: "Industrial Scrap & Metal Bales",
      category: "facility",
      image: "/industrial-scrap.png",
      desc: "Heavy factory turnings, industrial metal bales, and plant machinery scrap."
    },
    {
      id: "img-home-office",
      title: "Home & Office Storage Scrap",
      category: "materials",
      image: "/home-office-scrap.png",
      desc: "Office chairs, metal cupboards, desks, appliances, and home storage clutter scrap."
    },
    {
      id: "img-paper-carton",
      title: "Carton Boxes, Newspapers & Books Scrap",
      category: "materials",
      image: "/paper-carton-books-scrap.png",
      desc: "Bundled corrugated carton boxes, old newspapers, magazines, and textbooks."
    },
    {
      id: "img-bike-vehicle",
      title: "Bike, Bicycle & Vehicle Scrap",
      category: "materials",
      image: "/bike-cycle-vehicle-scrap.png",
      desc: "Scrap motorcycles, scooters, bicycles, cycle frames, and lead-acid batteries."
    },
    {
      id: 2,
      title: "Non-Ferrous Storage Vault",
      category: "facility",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
      desc: "Secure indoor storage unit for copper, brass, and aluminum scrap before smelting delivery."
    },
    {
      id: 3,
      title: "Heavy Crane Truck Loading",
      category: "fleet",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      desc: "Loading bulk heavy industrial structural steel columns directly onto our flatbed fleet."
    },
    {
      id: 4,
      title: "Old Car Towing Facility",
      category: "fleet",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      desc: "Dismantling and towing old, end-of-life cars from a customer site in Bengaluru."
    },
    {
      id: 5,
      title: "IT Office Clearance - Before",
      category: "beforeafter",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      desc: "Unorganized electronic cables, laptops, and older server towers piled in the office basement."
    },
    {
      id: 6,
      title: "IT Office Clearance - After",
      category: "beforeafter",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      desc: "Completely swept, cleaned basement space after e-waste removal and segregation."
    }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="gallery-container">
      {/* PAGE HEADER */}
      <section className="detail-header" role="banner">
        <div className="container">
          <div className="detail-breadcrumbs">Home / Gallery</div>
          <h1>Sri Sai Scrap Centre Gallery</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
            Official visiting card, Channasandra sorting facility, truck loaders, and site clearance collections.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="section">
        <div className="container">
          <div className="gallery-filter-tabs">
            <button 
              className={`gallery-tab ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => setFilter('all')}
            >
              All Photos
            </button>
            <button 
              className={`gallery-tab ${filter === 'card' ? 'active' : ''}`} 
              onClick={() => setFilter('card')}
            >
              Visiting Card
            </button>
            <button 
              className={`gallery-tab ${filter === 'facility' ? 'active' : ''}`} 
              onClick={() => setFilter('facility')}
            >
              Our Facility
            </button>
            <button 
              className={`gallery-tab ${filter === 'fleet' ? 'active' : ''}`} 
              onClick={() => setFilter('fleet')}
            >
              Fleet & Trucks
            </button>
            <button 
              className={`gallery-tab ${filter === 'beforeafter' ? 'active' : ''}`} 
              onClick={() => setFilter('beforeafter')}
            >
              Before & After
            </button>
          </div>

          {/* GALLERY GRID */}
          <div className="gallery-grid" role="region" aria-label="Photo gallery showcase">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => setSelectedImg(item)}
                role="button"
                tabIndex={0}
                aria-label={`View full-size image of ${item.title}`}
                onKeyDown={(e) => { if(e.key === 'Enter') setSelectedImg(item); }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-item-img"
                  loading="lazy"
                />
                <div className="gallery-item-overlay">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Eye size={20} />
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImg && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setSelectedImg(null)}
              aria-label="Close image modal"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImg.image} 
              alt={selectedImg.title} 
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <h3>{selectedImg.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                {selectedImg.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
