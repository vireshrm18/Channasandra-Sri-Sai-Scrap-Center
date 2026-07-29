import React, { useState, useEffect } from 'react';
import { 
  Database, RefreshCw, Phone, MessageSquare, CheckCircle, 
  Clock, Trash2, Shield, Filter, AlertCircle, Car, Flame, Cpu, Package
} from 'lucide-react';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, vehicles, pending, completed, contact
  const [dbStatus, setDbStatus] = useState('checking');

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const [resPickup, resContact] = await Promise.all([
        fetch('http://localhost:5000/api/pickup'),
        fetch('http://localhost:5000/api/contact')
      ]);

      if (resPickup.ok) {
        const pickupData = await resPickup.json();
        if (pickupData.success) {
          setRequests(pickupData.data);
          setDbStatus('connected');
        }
      }

      if (resContact.ok) {
        const contactData = await resContact.json();
        if (contactData.success) {
          setInquiries(contactData.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch from backend:', err);
      setError('Could not connect to Node/MySQL server. Make sure node server is running on port 5000.');
      setDbStatus('disconnected');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pickup/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request from MySQL database?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/pickup/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.filter(req => req.id !== id));
      }
    } catch (err) {
      alert('Error deleting request');
    }
  };

  const getScrapBadgeColor = (type) => {
    if (!type) return 'bg-gray';
    const lower = type.toLowerCase();
    if (lower.includes('vehicle')) return '#ef4444';
    if (lower.includes('metal') || lower.includes('iron')) return '#f59e0b';
    if (lower.includes('ewaste') || lower.includes('electronic')) return '#3b82f6';
    return '#10b981';
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'vehicles') return req.scrap_type?.toLowerCase().includes('vehicle');
    if (activeTab === 'pending') return req.status === 'Pending';
    if (activeTab === 'completed') return req.status === 'Completed';
    return true;
  });

  return (
    <div className="admin-container" style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
      <div className="container">
        
        {/* HEADER & DATABASE HEALTH BAR */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem',
          marginBottom: '2rem',
          backgroundColor: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Shield size={24} style={{ color: 'var(--primary)' }} />
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Sri Sai Scrap — Admin Requests Portal</h1>
            </div>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
              Live MySQL Database Management for Pickup & Vehicle Scrap Service Requests
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--radius-full)',
              backgroundColor: dbStatus === 'connected' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: dbStatus === 'connected' ? 'var(--primary)' : '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              <Database size={16} />
              <span>{dbStatus === 'connected' ? 'MySQL: Connected (sri_sai_scrap_db)' : 'MySQL: Disconnected'}</span>
            </div>

            <button onClick={fetchRequests} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh Data
            </button>
          </div>
        </div>

        {/* SUMMARY STAT CARDS */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Total Requests</span>
            <h2 style={{ fontSize: '2.2rem', margin: '0.25rem 0', color: 'var(--primary)' }}>{requests.length}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stored in MySQL DB</span>
          </div>

          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Vehicle Scrap Requests</span>
              <Car size={20} style={{ color: '#ef4444' }} />
            </div>
            <h2 style={{ fontSize: '2.2rem', margin: '0.25rem 0', color: '#ef4444' }}>
              {requests.filter(r => r.scrap_type?.toLowerCase().includes('vehicle')).length}
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bikes, Cycles, Cars</span>
          </div>

          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #f59e0b' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Pending Action</span>
            <h2 style={{ fontSize: '2.2rem', margin: '0.25rem 0', color: '#f59e0b' }}>
              {requests.filter(r => r.status === 'Pending').length}
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Requires Callback</span>
          </div>

          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Contact Messages</span>
            <h2 style={{ fontSize: '2.2rem', margin: '0.25rem 0', color: '#10b981' }}>{inquiries.length}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Website Inquiries</span>
          </div>
        </div>

        {/* TABS & TABLE CARD */}
        <div className="card" style={{ padding: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="gallery-filter-tabs" style={{ margin: 0 }}>
              <button 
                className={`gallery-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Requests ({requests.length})
              </button>
              <button 
                className={`gallery-tab ${activeTab === 'vehicles' ? 'active' : ''}`}
                onClick={() => setActiveTab('vehicles')}
                style={{ color: activeTab === 'vehicles' ? '#ef4444' : '' }}
              >
                Vehicle Scrap ({requests.filter(r => r.scrap_type?.toLowerCase().includes('vehicle')).length})
              </button>
              <button 
                className={`gallery-tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending ({requests.filter(r => r.status === 'Pending').length})
              </button>
              <button 
                className={`gallery-tab ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed ({requests.filter(r => r.status === 'Completed').length})
              </button>
              <button 
                className={`gallery-tab ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact Form Messages ({inquiries.length})
              </button>
            </div>
          </div>

          {error && (
            <div style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', 
              padding: '1rem', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* VIEW: PICKUP REQUESTS TABLE */}
          {activeTab !== 'contact' && (
            <div className="rate-table-container">
              {filteredRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                  <h3>No requests found in this category.</h3>
                  <p>When customers schedule a pickup on the website, their details will appear here instantly.</p>
                </div>
              ) : (
                <table className="rate-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer Details</th>
                      <th>Service Category</th>
                      <th>Weight / Date</th>
                      <th>Pickup Address & Notes</th>
                      <th>Status</th>
                      <th>Quick Contact / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((req) => (
                      <tr key={req.id}>
                        <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>#{req.id}</td>
                        
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{req.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{req.phone}</div>
                          {req.email && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.email}</div>}
                        </td>

                        <td>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            color: getScrapBadgeColor(req.scrap_type),
                            display: 'inline-block'
                          }}>
                            {req.scrap_type}
                          </span>
                        </td>

                        <td>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{req.approx_weight}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📅 {req.preferred_date}</div>
                        </td>

                        <td style={{ maxWidth: '240px' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{req.address}</div>
                          {req.notes && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                              Note: {req.notes}
                            </div>
                          )}
                        </td>

                        <td>
                          <select 
                            value={req.status || 'Pending'} 
                            onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                            style={{ 
                              padding: '0.3rem 0.5rem', 
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border)',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              backgroundColor: req.status === 'Completed' ? '#dcfce7' : req.status === 'Contacted' ? '#dbeafe' : '#fef3c7',
                              color: req.status === 'Completed' ? '#15803d' : req.status === 'Contacted' ? '#1d4ed8' : '#b45309'
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <a 
                              href={`tel:${req.phone}`} 
                              className="btn btn-secondary" 
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              title="Call Customer"
                            >
                              <Phone size={14} /> Call
                            </a>
                            
                            <a 
                              href={`https://wa.me/91${req.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(req.name)},%20this%20is%20Praveen%20from%20Sri%20Sai%20Scrap%20Centre%20regarding%20your%20${encodeURIComponent(req.scrap_type)}%20request.`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-whatsapp" 
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              title="WhatsApp Customer"
                            >
                              <MessageSquare size={14} /> Chat
                            </a>

                            <button 
                              onClick={() => handleDeleteRequest(req.id)}
                              style={{ 
                                backgroundColor: 'transparent', 
                                border: 'none', 
                                color: '#ef4444', 
                                cursor: 'pointer',
                                padding: '0.3rem' 
                              }}
                              title="Delete Request"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* VIEW: CONTACT INQUIRIES TABLE */}
          {activeTab === 'contact' && (
            <div className="rate-table-container">
              {inquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                  <h3>No contact inquiries found.</h3>
                </div>
              ) : (
                <table className="rate-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name & Phone</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td style={{ fontWeight: 700 }}>#{inq.id}</td>
                        <td>
                          <div style={{ fontWeight: 700 }}>{inq.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{inq.phone}</div>
                        </td>
                        <td>{inq.email || 'N/A'}</td>
                        <td style={{ fontWeight: 600 }}>{inq.subject}</td>
                        <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>{inq.message}</td>
                        <td>
                          <a 
                            href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)},%20this%20is%20Praveen%20from%20Sri%20Sai%20Scrap%20Centre.`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp" 
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <MessageSquare size={14} /> Reply WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
