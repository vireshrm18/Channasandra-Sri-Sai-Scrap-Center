# AGMR Notes - Educational Resource Website

A complete educational resource management system where admins can upload study materials and users can download them for free.

## Features

### For Users:
- Browse CSE 2022 Scheme (3rd to 8th Semester)
- View subjects for each semester
- Download Notes, Previous Question Papers, and Syllabus for FREE
- Clean, responsive design

### For Admins:
- Secure admin login
- Upload and manage resources (Notes, Question Papers, Syllabus)
- Organize content by semester and subject
- Delete resources when needed

## How to Use

### For Users:
1. Open `index.html` in your browser
2. Click on "CSE 2022 Scheme"
3. Select your semester (3rd to 8th)
4. Download any resource for free

### For Admins:
1. Click "Admin Login" in the footer
2. Login with credentials:
   - **Username:** admin
   - **Password:** admin123
3. Select semester and enter subject name
4. Upload files (Notes, Question Papers, or Syllabus)
5. Files will be available for users to download

## Current Implementation

This is a **frontend-only demo** using localStorage to store file metadata. For production use, you need to implement a proper backend.

## Production Setup (Required for Real Use)

To make this production-ready, you need:

### 1. Backend Server (Node.js/PHP/Python)
Create a backend API to:
- Handle file uploads
- Store files on server or cloud storage (AWS S3, Google Cloud Storage)
- Manage user authentication
- Serve files for download

### 2. Database
Use MySQL, PostgreSQL, or MongoDB to store:
- Admin credentials (hashed passwords)
- File metadata (name, path, semester, subject, upload date)
- User activity logs

### 3. File Storage
- Store uploaded files in a secure directory
- Or use cloud storage (AWS S3, Cloudflare R2, etc.)

### 4. Security
- Implement proper authentication (JWT tokens)
- Hash passwords (bcrypt)
- Validate file types and sizes
- Add CSRF protection
- Use HTTPS

## File Structure

```
├── index.html              # Homepage
├── cse-2022.html          # Semester selection page
├── sem3.html to sem8.html # Individual semester pages
├── about.html             # About page
├── contact.html           # Contact page
├── admin-login.html       # Admin login
├── admin-dashboard.html   # Admin dashboard
├── styles.css             # All styles
├── script.js              # User-side JavaScript
├── admin-login.js         # Admin login logic
├── admin-dashboard.js     # Admin dashboard logic
└── README.md              # This file
```

## Technologies Used

- HTML5
- CSS3 (Responsive Design)
- JavaScript (ES6+)
- LocalStorage (for demo purposes)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- User registration and login
- Search functionality
- Bookmark/favorite resources
- Download statistics
- Multiple admin roles
- Email notifications
- Mobile app

## License

Free to use for educational purposes.

## Support

For issues or questions, use the Contact page on the website.

---
**AGMR Notes** - Making education accessible for everyone.
