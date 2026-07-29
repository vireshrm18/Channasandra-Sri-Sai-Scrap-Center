# Sai Scrap Metal Recycling Website Documentation

This documentation details the architecture, SEO features, interactive systems, and customization guidelines for the Sai Scrap metal recycling business website. The project has been fully developed using a fast, modern React + Vite stack and styled with responsive, premium vanilla CSS.

---

## 📁 File Structure & Architecture

The project is structured cleanly to ensure maintainability, quick page loads, and modular scalability:

```
c:\Users\vires\OneDrive\Desktop\Scrap\
├── public/
│   ├── favicon.svg          # Business favicon
│   ├── robots.txt           # Search crawler instructions
│   └── sitemap.xml          # XML sitemap for SEO indexing
├── src/
│   ├── assets/              # Standard assets (logos, static icons)
│   ├── components/
│   │   ├── FloatButtons.jsx # Floating click-to-call & WhatsApp widgets
│   │   ├── Footer.jsx       # Consolidated business NAP & site navigation footer
│   │   ├── Header.jsx       # Sticky glassmorphic responsive navbar
│   │   └── ScrollToTop.jsx  # Utility to reset scroll position on page transition
│   ├── data/
│   │   └── servicesData.js  # Centralized services database
│   ├── pages/
│   │   ├── About.jsx        # Business story, metrics, and certifications
│   │   ├── Contact.jsx      # Forms, contact info, and Google Maps location
│   │   ├── Gallery.jsx      # Image grids, filter tabs, and Lightbox modal
│   │   ├── Home.jsx         # Hero section, trust badges, process, reviews
│   │   ├── Pickup.jsx       # Scheduling scheduler form & mock file upload
│   │   ├── Rates.jsx        # Standard daily pricing sheet & interactive calculator
│   │   └── ServiceDetail.jsx# Dynamically routed detailed category view
│   ├── App.css              # Reset rules and theme variables
│   ├── App.jsx              # Routing configurations and page bindings
│   ├── index.css            # Global CSS design system (tokens, grid, forms)
│   └── main.jsx             # Entry point
├── index.html               # Main index, Google Fonts, Open Graph, Local Schema JSON-LD
├── package.json             # NPM package scripts & dependencies
└── vite.config.js           # Vite bundler rules
```

---

## 🚀 Key Features Built

### 1. Advanced Local SEO (Search Engine Optimization)
- **Schema.org Structured Data**: Included `LocalBusiness` JSON-LD metadata in `index.html` detailing coordinates, serving areas (Bengaluru), phone numbers (`+918861247315`), and email (`praveen123@gmail.com`) to help Google rank the site in local searches.
- **Search Metadata**: Dynamic meta titles and descriptions configured on each page targeting terms like *"scrap dealer in Bengaluru"*, *"sell scrap metal Bengaluru"*, and *"scrap buyer near me"*.
- **Index Optimization**: Complete `robots.txt` and `sitemap.xml` prepared for search crawler discovery.
- **Semantic HTML**: Built using modern semantic landmarks (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`) with descriptive headings (H1, H2, H3).

### 2. Interactive Scrap Payout Calculator
Located on the **Scrap Rates** page. Users can select from various materials (Copper, Iron, Brass, Newspapers, Batteries, etc.), input the weight in Kg, and instantly see a computed estimated value based on daily rates.

### 3. Photo Gallery with Filter Tabs & Lightbox
Located on the **Gallery** page. Renders photos categorized by *Facility*, *Fleet & Trucks*, and *Before & After*. Clicking any photo opens a full-screen modal Lightbox overlay showing the high-resolution image, title, and clear descriptions.

### 4. Step-by-Step Doorstep Pickup Scheduler
Located on the **Request Pickup** page. Includes client validations for Name, WhatsApp/Phone, and Address. Users can specify scrap categories, quantities, select a date, and select a local photo file. Successful submission pops up a custom modal.

### 5. Floating Click-to-Contact Floaters
Sticky green (WhatsApp) and green/teal (Phone call) floating widgets are placed on the bottom right corner of the screen for instant customer calls.

---

## 🛠️ How to Run & Deploy

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Install dependencies
Run this command in the workspace terminal to install React and router packages:
```bash
npm install
```

### 2. Start the Development Server
Run this command to boot up the local dev environment:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Build for Production
To compile and optimize the site for web hosting (Netlify, Vercel, Firebase, etc.):
```bash
npm run build
```
This generates a highly optimized static bundle inside the `/dist` directory, ready to serve over HTTPS.

---

## ✏️ Customization Guidelines

When you are ready to replace placeholder values with your real business data:

| Element to Customize | File Location | How to Update |
| :--- | :--- | :--- |
| **Pricing Rates** | `src/pages/Rates.jsx` | Edit rates inside the `ratesData` array (line 21-41) and the `calcMaterials` array (line 44-56). |
| **Service Categories & Details** | `src/data/servicesData.js` | Change text values, list details, or swap the Unsplash image URLs with local image paths. |
| **Business Details (NAP)** | `src/components/Footer.jsx`, `src/pages/Contact.jsx` | Update contact numbers, email address, address lines, and business hours. |
| **SEO Meta Tags & Schema** | `index.html` | Modify the JSON-LD script inside `<head>` to change maps geo-coordinates or social media URLs. |
| **Google Maps Location** | `src/pages/Contact.jsx` | Go to Google Maps, search for your address, click "Share" > "Embed Map", and copy the source URL into the `iframe` `src` attribute (line 125). |
| **Real Gallery Photos** | `src/pages/Gallery.jsx` | Replace the Unsplash URLs in `galleryItems` (line 7-45) with local image references. |
