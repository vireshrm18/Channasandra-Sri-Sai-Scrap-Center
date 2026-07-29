import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import VisitingCard from '../components/VisitingCard';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error("API submit error:", err);
    }
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      {/* PAGE HEADER */}
      <section className="detail-header" role="banner">
        <div className="container">
          <div className="detail-breadcrumbs">Home / Contact Us</div>
          <h1>Contact Sri Sai Scrap Centre</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
            Dealers in all kinds of Scrap Items | Proprietor: Praveen | Channasandra, Kadugodi Post, Bangalore
          </p>
        </div>
      </section>

      {/* VISITING CARD SHOWCASE */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <VisitingCard />
        </div>
      </section>

      {/* CONTACT INFO AND FORM */}
      <section className="section">
        <div className="container contact-grid">
          {/* Details list */}
          <div>
            <span className="section-subtitle">Get In Touch</span>
            <h2 style={{ marginBottom: '1.5rem' }}>Direct Contact Info</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              We are located in Channasandra, Kadugodi Post, Bangalore - 560 067. Reach Praveen directly by call or WhatsApp.
            </p>

            <div className="contact-info-list" role="list">
              <div className="contact-info-item" role="listitem">
                <div className="contact-info-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Proprietor: Praveen</h4>
                  <a href="tel:+918861247315" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>
                    8861247315
                  </a>
                  <p style={{ fontSize: '0.8rem' }}>Fast responses 9 AM - 7 PM</p>
                </div>
              </div>

              <div className="contact-info-item" role="listitem">
                <div className="contact-info-icon" style={{ backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25d366' }}>
                  <MessageSquare size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>WhatsApp Chat</h4>
                  <a 
                    href="https://wa.me/918861247315?text=Hi%20Praveen,%20Sri%20Sai%20Scrap%20Centre" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ fontWeight: 700, fontSize: '1.1rem', color: '#25d366' }}
                  >
                    8861247315
                  </a>
                  <p style={{ fontSize: '0.8rem' }}>Send scrap photos for quick quotes</p>
                </div>
              </div>

              <div className="contact-info-item" role="listitem">
                <div className="contact-info-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Email Address</h4>
                  <a href="mailto:channasandrasreesaiscrap@gmail.com" style={{ fontWeight: 600, color: 'var(--primary)', wordBreak: 'break-all' }}>
                    channasandrasreesaiscrap@gmail.com
                  </a>
                  <p style={{ fontSize: '0.8rem' }}>For bulk quotes & inquiries</p>
                </div>
              </div>

              <div className="contact-info-item" role="listitem">
                <div className="contact-info-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Shop Address</h4>
                  <p style={{ fontWeight: 700 }}>Channasandra, Kadugodi Post</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Bangalore - 560 067</p>
                  <a 
                    href="https://goo.gl/maps/FF4eRiN9FBBGNuhd6?g_st=aw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}
                  >
                    <MapPin size={14} /> Open Exact Shop Location in Google Maps ↗
                  </a>
                </div>
              </div>

              <div className="contact-info-item" role="listitem">
                <div className="contact-info-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Business Hours</h4>
                  <p style={{ fontWeight: 600 }}>Monday - Sunday</p>
                  <p style={{ fontSize: '0.8rem' }}>9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map with Direct Navigation Button to Exact Shop Location */}
            <div className="map-container" style={{ position: 'relative' }}>
              <a 
                href="https://goo.gl/maps/FF4eRiN9FBBGNuhd6?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Click to open Sri Sai Scrap Centre in Google Maps"
                style={{ display: 'block', position: 'relative' }}
              >
                <iframe 
                  title="Sri Sai Scrap Centre Exact Shop Location, Channasandra Bengaluru"
                  className="map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.488358484139!2d77.74706596163351!3d12.980076295551468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11d6db796e6d%3A0xe54d896174a743a1!2sChannasandra%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ pointerEvents: 'none' }}
                ></iframe>
              </a>

              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <a 
                  href="https://goo.gl/maps/FF4eRiN9FBBGNuhd6?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <MapPin size={20} /> Open Sri Sai Scrap Centre in Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Contact form card */}
          <div className="card">
            <h3 style={{ marginBottom: '0.5rem' }}>Send Us a Message</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              We'll get back to you within 2-4 business hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Full Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  className="form-control"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="contact-phone" 
                  name="phone" 
                  className="form-control"
                  placeholder="e.g. 9876543210"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  className="form-control"
                  placeholder="e.g. ramesh@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <select 
                  id="contact-subject" 
                  name="subject" 
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="General Inquiry">General Scrap Inquiry</option>
                  <option value="Bulk metal selling">Bulk Metal Scrap Selling</option>
                  <option value="E-Waste contract">IT/E-Waste Disposal Contract</option>
                  <option value="Industrial demotion">Factory Demolition Tender</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">How can we help you?</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  className="form-control"
                  placeholder="Write your scrap details, quantity, and specific request..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL DIALOG */}
      {submitted && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <CheckCircle className="modal-icon animate-bounce" size={56} />
            <h3>Message Sent Successfully!</h3>
            <p>
              Thank you for contacting Sai Scrap. Praveen or one of our team members will contact you shortly on your provided phone number.
            </p>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)} style={{ minWidth: '120px' }}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
