import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
};

const DB_NAME = 'sri_sai_scrap_db';

let dbPool = null;

// Initialize MySQL database connection and auto-create database/tables
async function initDatabase() {
  try {
    // 1. Connect without database name to ensure database exists
    const tempConnection = await mysql.createConnection(dbConfig);
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await tempConnection.end();

    // 2. Create connection pool with database selected
    dbPool = mysql.createPool({
      ...dbConfig,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // 3. Create tables if they do not exist
    const createPickupTableQuery = `
      CREATE TABLE IF NOT EXISTS pickup_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        address TEXT NOT NULL,
        scrap_type VARCHAR(100) NOT NULL,
        approx_weight VARCHAR(100),
        preferred_date VARCHAR(100),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createContactTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await dbPool.query(createPickupTableQuery);
    await dbPool.query(createContactTableQuery);

    console.log(`✅ MySQL Database '${DB_NAME}' initialized and ready!`);
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
}

// Routes

// 1. Submit a new Pickup or Vehicle Scrap Request
app.post('/api/pickup', async (req, res) => {
  try {
    const { name, phone, email, address, scrap_type, approx_weight, preferred_date, notes } = req.body;

    if (!name || !phone || !address || !scrap_type) {
      return res.status(400).json({ success: false, message: 'Name, phone, address, and scrap type are required.' });
    }

    if (!dbPool) {
      return res.status(500).json({ success: false, message: 'Database connection not initialized.' });
    }

    const query = `
      INSERT INTO pickup_requests (name, phone, email, address, scrap_type, approx_weight, preferred_date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await dbPool.query(query, [
      name,
      phone,
      email || '',
      address,
      scrap_type,
      approx_weight || 'Not specified',
      preferred_date || 'ASAP',
      notes || ''
    ]);

    res.status(201).json({
      success: true,
      message: 'Scrap request submitted successfully!',
      requestId: result.insertId
    });
  } catch (err) {
    console.error('Error inserting pickup request:', err);
    res.status(500).json({ success: false, message: 'Failed to submit request to database.', error: err.message });
  }
});

// 2. Fetch all Pickup Requests (for Admin Dashboard)
app.get('/api/pickup', async (req, res) => {
  try {
    if (!dbPool) {
      return res.status(500).json({ success: false, message: 'Database connection not initialized.' });
    }

    const [rows] = await dbPool.query('SELECT * FROM pickup_requests ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching pickup requests:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch requests.', error: err.message });
  }
});

// 3. Update Status of a Pickup Request
app.patch('/api/pickup/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const [result] = await dbPool.query('UPDATE pickup_requests SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    res.json({ success: true, message: 'Status updated successfully.' });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ success: false, message: 'Failed to update status.', error: err.message });
  }
});

// 4. Delete a Pickup Request
app.delete('/api/pickup/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await dbPool.query('DELETE FROM pickup_requests WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }
    res.json({ success: true, message: 'Request deleted successfully.' });
  } catch (err) {
    console.error('Error deleting request:', err);
    res.status(500).json({ success: false, message: 'Failed to delete request.', error: err.message });
  }
});

// 5. Submit Contact Inquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone, and message are required.' });
    }

    const query = `
      INSERT INTO contact_inquiries (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await dbPool.query(query, [
      name,
      email || '',
      phone,
      subject || 'General Inquiry',
      message
    ]);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      inquiryId: result.insertId
    });
  } catch (err) {
    console.error('Error inserting contact inquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry.', error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Sri Sai Scrap Server running on http://localhost:${PORT}`);
  initDatabase();
});
