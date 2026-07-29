# ♻️ Sri Sai Scrap Centre — Official Business Website

Official web application and scrap pickup scheduling portal for **Sri Sai Scrap Centre** located in Channasandra, Kadugodi Post, Bangalore.

Managed by **Praveen** | Contact: **+91 88612 47315** | Email: **channasandrasreesaiscrap@gmail.com**

---

## 📍 Business Overview

- **Shop Name**: Sri Sai Scrap Centre
- **Proprietor**: Praveen
- **Phone / WhatsApp**: +91 88612 47315
- **Address**: Channasandra, Kadugodi Post, Bangalore - 560067
- **Google Maps Location**: [Open in Google Maps](https://goo.gl/maps/FF4eRiN9FBBGNuhd6?g_st=aw)

---

## 🌟 Key Features

1. **7 Service Categories**:
   - Iron & Steel Scrap
   - Copper, Brass & Aluminum Scrap
   - E-Waste & Electronics Recycling
   - Industrial Scrap & Factory Metal Bales
   - Home & Office Storage Clearance
   - Carton Boxes, Newspapers & Textbooks
   - Bike, Bicycle & Vehicle Scrap

2. **Doorstep Scrap Pickup Scheduler**:
   - Customer pickup request form with scrap type, quantity, preferred date, address, and notes.
   - **Dual Action Persistence**: Saves request to local **MySQL Database (`sri_sai_scrap_db`)** and automatically dispatches an instant pre-formatted WhatsApp message directly to Praveen (**8861247315**).

3. **Authentic Visual Gallery**:
   - Real physical shop front board photo (`shop-front.jpg`) and official business visiting card (`visiting-card.jpg`).
   - Category filtering (All, Visiting Card, Our Facility, Fleet & Trucks, Before & After).

4. **Contact & Direct Navigation**:
   - Interactive Google Map embed pointing to the exact shop location in Channasandra.
   - 1-click **Get Direct Driving Directions** button.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Lucide React Icons, Vanilla CSS Design Tokens
- **Backend API**: Node.js, Express.js, CORS
- **Database**: MySQL 8 (`mysql2/promise`)
- **Deployment Target**: Netlify (Frontend) / Node.js Server (Backend API)

---

## 🚀 Local Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/vireshrm18/Channasandra-Sri-Sai-Scrap-Center.git
cd Channasandra-Sri-Sai-Scrap-Center
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Backend Server (Express + MySQL)
Ensure MySQL is running on port 3306 (user: `root`, password: `root`).
```bash
node server.js
```

### 4. Start Frontend Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Netlify Deployment Settings

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

---

© 2026 Sri Sai Scrap Centre. All Rights Reserved.
