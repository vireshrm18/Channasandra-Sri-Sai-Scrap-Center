# 🔄 How to Update Your Website After Deployment

## Two Ways to Add/Modify Content

### Method 1: Using Admin Dashboard (Recommended for Notes)
### Method 2: Updating Code Files (For Design Changes)

---

## 📝 Method 1: Admin Dashboard (For Adding Notes)

**This is the EASIEST way to add notes, question papers, and syllabus!**

### Step 1: Access Admin Panel
1. Go to your website: `your-website-url.com/admin-login.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123`

### Step 2: Add Notes
1. Select semester (3rd to 7th)
2. Select subject from dropdown OR add new subject
3. Select module (Module 1 to 5)
4. Choose PDF file
5. Click "Upload Notes"
6. **Done!** Notes are now live on your website

### Step 3: Add Question Papers
1. Select semester
2. Select subject
3. Select year (2023, 2022, or 2021)
4. Choose PDF file
5. Click "Upload Question Papers"
6. **Done!** Question papers are now live

### Step 4: Add Syllabus
1. Select semester
2. Select subject
3. Choose PDF file
4. Click "Upload Syllabus"
5. **Done!** Syllabus is now live

**✅ Changes appear INSTANTLY on your website!**

---

## 💻 Method 2: Updating Code Files (For Design/Structure Changes)

**Use this when you want to:**
- Change colors or design
- Add new pages
- Modify text
- Update subjects

### If Deployed on Vercel/Netlify:

#### Option A: Using GitHub (Automatic Updates)

**Initial Setup (One Time):**
1. Create GitHub account: https://github.com
2. Create repository: `agmr-notes`
3. Upload all your files to GitHub
4. Connect Vercel/Netlify to GitHub

**To Update Website:**
1. Edit files on your computer
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated notes"
   git push
   ```
3. **Automatic!** Vercel/Netlify detects changes and updates your website

#### Option B: Manual Upload (Simple)

**For Netlify:**
1. Go to https://app.netlify.com
2. Find your site
3. Drag and drop updated folder
4. **Done!** Website updates in 1 minute

**For Vercel:**
1. Go to https://vercel.com/dashboard
2. Find your project
3. Click "Redeploy"
4. Upload updated files
5. **Done!** Website updates

---

## 🎯 What to Update Where

### Adding/Modifying Notes → Use Admin Dashboard
- Upload PDFs
- Add new subjects
- Organize by modules
- **No coding needed!**

### Changing Design/Colors → Update Code Files
- Edit `styles.css`
- Change colors, fonts, layout
- Redeploy website

### Adding New Subjects → Use Admin Dashboard
- Click "Add Subject" button
- Enter subject name
- System creates 5 modules automatically
- Start uploading notes

### Changing Subject Names → Update HTML Files
- Edit semester files (sem3.html, sem4.html, etc.)
- Change `<h3>Subject Name</h3>`
- Redeploy website

---

## 📂 File Structure (What Each File Does)

```
Your Website/
├── index.html          → Homepage (change welcome text here)
├── sem3.html           → 3rd semester subjects
├── sem4.html           → 4th semester subjects
├── sem5.html           → 5th semester subjects
├── sem6.html           → 6th semester subjects
├── sem7.html           → 7th semester subjects
├── sem8.html           → 8th semester (coming soon page)
├── styles.css          → All colors, fonts, design
├── script.js           → Website functionality
├── admin-dashboard.html → Admin panel
├── server.js           → Backend (handles file uploads)
└── uploads/            → Stores all uploaded files
```

---

## 🔐 Important: Backend for File Uploads

### If You Want File Upload to Work:

Your backend (server.js) needs to be running. You have two options:

#### Option 1: Deploy Backend Separately
1. Deploy backend to Railway/Render
2. Get backend URL (e.g., `https://agmr-backend.railway.app`)
3. Update frontend to use this URL

#### Option 2: Use Cloud Storage
1. Use Google Drive/Dropbox for files
2. Share files publicly
3. Copy links and paste in admin dashboard

---

## 🚀 Recommended Workflow

### For Daily Updates (Adding Notes):
1. Go to admin panel
2. Upload notes/question papers
3. **Done!** Changes are instant

### For Major Changes (Design/Structure):
1. Edit files on your computer
2. Test locally (run `npm start`)
3. Push to GitHub or re-upload to Netlify/Vercel
4. Website updates automatically

---

## 💡 Pro Tips

### Tip 1: Keep Local Copy
Always keep a copy of your website on your computer. This way you can:
- Make changes offline
- Test before deploying
- Have a backup

### Tip 2: Use GitHub
Connect your website to GitHub for:
- Version control (track all changes)
- Automatic deployments
- Easy collaboration
- Backup of all files

### Tip 3: Regular Backups
- Download uploaded files regularly
- Keep backup of database/localStorage
- Export important data

---

## 🆘 Common Scenarios

### Scenario 1: "I want to add notes for a new subject"
**Solution:** Use Admin Dashboard
1. Login to admin panel
2. Select semester
3. Type new subject name
4. Click "Add Subject"
5. Upload notes by module

### Scenario 2: "I want to change the college name"
**Solution:** Edit HTML files
1. Open all HTML files
2. Find "A.G.M COLLEGE"
3. Replace with new name
4. Redeploy website

### Scenario 3: "I want to change colors"
**Solution:** Edit styles.css
1. Open `styles.css`
2. Find color codes (e.g., `#8B0000`)
3. Replace with new colors
4. Redeploy website

### Scenario 4: "I want to add 8th semester subjects"
**Solution:** Edit sem8.html
1. Open `sem8.html`
2. Copy structure from `sem7.html`
3. Add your subjects
4. Redeploy website

---

## 📱 Quick Reference

| What to Update | Where to Do It | How Long |
|----------------|----------------|----------|
| Add Notes | Admin Dashboard | 2 minutes |
| Add Question Papers | Admin Dashboard | 2 minutes |
| Add New Subject | Admin Dashboard | 1 minute |
| Change Colors | styles.css → Redeploy | 5 minutes |
| Change Text | HTML files → Redeploy | 5 minutes |
| Add New Page | Create HTML → Redeploy | 10 minutes |

---

## 🎓 Summary

**For 90% of updates (adding notes):**
→ Use Admin Dashboard (no coding needed!)

**For design changes:**
→ Edit files → Redeploy website

**Best Practice:**
1. Make changes on your computer
2. Test locally
3. Deploy to live website
4. Share with students!

---

## Need Help?

**Can't access admin panel?**
- Check URL: `your-site.com/admin-login.html`
- Default password: `admin123`

**File upload not working?**
- Backend needs to be deployed
- Or use direct file links

**Want to change something but don't know how?**
- Tell me what you want to change
- I'll guide you step by step!
