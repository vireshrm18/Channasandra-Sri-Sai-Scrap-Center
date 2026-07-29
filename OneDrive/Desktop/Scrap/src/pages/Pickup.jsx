import React, { useState } from 'react';
import { Truck, Upload, Calendar, Trash2, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PickupPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    scrapType: 'metals',
    quantity: 'under-50',
    preferredDate: '',
    description: '',
    file: null
  });

  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file: file }));
      setFileName(file.name);
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, file: null }));
    setFileName('');
  };

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    // Format WhatsApp message for Praveen (8861247315)
    const waMsg = `*NEW SCRAP PICKUP REQUEST — SRI SAI SCRAP CENTRE*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Scrap Category:* ${encodeURIComponent(formData.scrapType)}%0A` +
      `*Quantity/Weight:* ${encodeURIComponent(formData.quantity)}%0A` +
      `*Address:* ${encodeURIComponent(formData.address)}%0A` +
      `*Preferred Date:* ${encodeURIComponent(formData.preferredDate || 'ASAP')}%0A` +
      `*Details:* ${encodeURIComponent(formData.description || 'None')}`;

    const whatsappUrl = `https://wa.me/918861247315?text=${waMsg}`;
    setLastWhatsappUrl(whatsappUrl);

    try {
      // 1. Save request to MySQL database
      await fetch('http://localhost:5000/api/pickup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          scrap_type: formData.scrapType,
          approx_weight: formData.quantity,
          preferred_date: formData.preferredDate || 'ASAP',
          notes: formData.description
        })
      });
    } catch (err) {
      console.error('API submit error:', err);
    } finally {
      // 2. Open WhatsApp directly to send to Praveen
      window.open(whatsappUrl, '_blank');
      setSubmitted(true);
      setSubmitting(false);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        scrapType: 'Iron, Steel & General Metals',
        quantity: 'Under 50 Kg',
        preferredDate: '',
        description: '',
        file: null
      });
      setFileName('');
    }
  };

  return (
    <div className="pickup-container">
      {/* PAGE HEADER */}
      <section className="detail-header" role="banner">
        <div className="container">
          <div className="detail-breadcrumbs">Home / Request Pickup</div>
          <h1>Schedule a Free Doorstep Pickup</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
            Enter your details below, and our team will visit you with certified digital scales.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="pickup-form-wrapper">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div className="cert-icon-wrapper" style={{ color: 'var(--primary)' }}>
                <Truck size={36} />
              </div>
            </div>
            <h2 className="pickup-form-title">Pickup Scheduler</h2>
            <p className="pickup-form-desc">
              Fill in the form to get standard market rates and arrange a hassle-free scrap collection.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pickup-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="pickup-name" 
                    name="name" 
                    className="form-control"
                    placeholder="e.g. Anand Gowda"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="pickup-phone">WhatsApp / Phone Number *</label>
                  <input 
                    type="tel" 
                    id="pickup-phone" 
                    name="phone" 
                    className="form-control"
                    placeholder="e.g. 8861247315"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pickup-address">Pickup Address *</label>
                <textarea 
                  id="pickup-address" 
                  name="address" 
                  className="form-control"
                  style={{ minHeight: '80px' }}
                  placeholder="e.g. Door No. 42, 3rd Cross, near Channasandra Railway Station, Bengaluru"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pickup-type">Primary Scrap Category *</label>
                  <select 
                    id="pickup-type" 
                    name="scrapType" 
                    className="form-control"
                    value={formData.scrapType}
                    onChange={handleChange}
                  >
                    <option value="metals">Iron, Steel & General Metals</option>
                    <option value="valuable-metals">Copper, Brass & Aluminum</option>
                    <option value="ewaste">E-Waste & Computer scrap</option>
                    <option value="industrial">Bulk Industrial Scrap</option>
                    <option value="home-office">Home / Office Clearance</option>
                    <option value="vehicles">Old Vehicle Scrap</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pickup-quantity">Approximate Quantity *</label>
                  <select 
                    id="pickup-quantity" 
                    name="quantity" 
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
                  >
                    <option value="under-50">Under 50 Kg</option>
                    <option value="50-100">50 Kg to 100 Kg</option>
                    <option value="100-500">100 Kg to 500 Kg</option>
                    <option value="500-plus">500+ Kg (Bulk/Commercial)</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pickup-date">Preferred Date</label>
                  <input 
                    type="date" 
                    id="pickup-date" 
                    name="preferredDate" 
                    className="form-control"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                </div>

                {/* FILE UPLOAD */}
                <div className="form-group">
                  <label className="form-label">Upload Scrap Photo (Optional)</label>
                  <div className="file-upload-wrapper">
                    <input 
                      type="file" 
                      id="pickup-file"
                      className="file-upload-input" 
                      accept="image/*"
                      onChange={handleFileChange}
                      aria-label="Upload scrap photo"
                    />
                    <Upload size={24} className="file-upload-icon" />
                    {fileName ? (
                      <div>
                        <span className="file-upload-text" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                          {fileName}
                        </span>
                        <button 
                          onClick={handleRemoveFile} 
                          style={{ marginLeft: '1rem', color: 'red', fontSize: '0.8rem', textDecoration: 'underline' }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="file-upload-text">Click or Drag photo here</div>
                        <div className="file-upload-hint">PNG, JPG, or JPEG up to 5MB</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pickup-desc">Additional Details / Item List</label>
                <textarea 
                  id="pickup-desc" 
                  name="description" 
                  className="form-control"
                  style={{ minHeight: '100px' }}
                  placeholder="e.g. 2 heavy batteries, old copper wires, and about 10 old steel plates."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>We respect your privacy. Your contact details are strictly used for scheduling the pickup request.</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem 2rem' }}>
                Confirm Pickup Schedule <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CONFIRMATION DIALOG MODAL */}
      {submitted && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card" style={{ maxWidth: '520px' }}>
            <CheckCircle className="modal-icon animate-bounce" size={56} style={{ color: 'var(--primary)' }} />
            <h3>Request Stored & Sent to WhatsApp!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Your pickup details have been successfully stored in our database. We have also prepared an instant notification for Praveen's WhatsApp (<strong>8861247315</strong>).
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {lastWhatsappUrl && (
                <a 
                  href={lastWhatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp" 
                  style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '1rem', fontWeight: 700 }}
                >
                  💬 Click Here to Send to Praveen on WhatsApp
                </a>
              )}
              <button className="btn btn-secondary" onClick={() => setSubmitted(false)} style={{ width: '100%' }}>
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
