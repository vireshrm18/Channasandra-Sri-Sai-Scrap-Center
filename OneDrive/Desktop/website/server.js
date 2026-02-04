// Simple Node.js backend for file uploads
// Install dependencies: npm install express multer cors

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const semester = req.body.semester || 'general';
        const subject = req.body.subject || 'general';
        const type = req.body.type || 'notes';
        const module = req.body.module || '';
        const year = req.body.year || '';
        
        let dir = path.join(uploadsDir, semester, subject, type);
        if (module) dir = path.join(dir, module);
        if (year) dir = path.join(dir, year);
        
        // Create directory if it doesn't exist
        fs.mkdirSync(dir, { recursive: true });
        
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // Keep original filename with timestamp
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: function (req, file, cb) {
        // Accept only PDF and DOC files
        const allowedTypes = /pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF and DOC files are allowed!'));
        }
    }
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Simple authentication (use proper authentication in production)
    if (username === 'admin' && password === 'admin123') {
        res.json({ 
            success: true, 
            message: 'Login successful',
            token: 'demo-token-' + Date.now() // Use JWT in production
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
        });
    }
});

// Upload file endpoint
app.post('/api/upload', upload.array('files', 10), (req, res) => {
    try {
        const { semester, subject, type, module, year } = req.body;
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'No files uploaded' 
            });
        }
        
        const uploadedFiles = req.files.map(file => {
            let url = `/uploads/${semester}/${subject}/${type}`;
            if (module) url += `/${module}`;
            if (year) url += `/${year}`;
            url += `/${file.filename}`;
            
            return {
                name: file.originalname,
                filename: file.filename,
                size: file.size,
                url: url,
                uploadDate: new Date().toISOString(),
                module: module || null,
                year: year || null
            };
        });
        
        res.json({ 
            success: true, 
            message: 'Files uploaded successfully',
            files: uploadedFiles
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Get resources for a semester
app.get('/api/resources/:semester', (req, res) => {
    const semester = req.params.semester;
    const semesterDir = path.join(uploadsDir, semester);
    
    if (!fs.existsSync(semesterDir)) {
        return res.json({ success: true, resources: {} });
    }
    
    const resources = {};
    
    // Read all subjects in the semester
    const subjects = fs.readdirSync(semesterDir);
    
    subjects.forEach(subject => {
        resources[subject] = {
            notes: [],
            questionPapers: [],
            syllabus: []
        };
        
        const subjectDir = path.join(semesterDir, subject);
        
        // Handle notes with modules
        const notesDir = path.join(subjectDir, 'notes');
        if (fs.existsSync(notesDir)) {
            resources[subject].notes = {};
            ['module1', 'module2', 'module3', 'module4', 'module5'].forEach(module => {
                const moduleDir = path.join(notesDir, module);
                if (fs.existsSync(moduleDir)) {
                    const files = fs.readdirSync(moduleDir);
                    resources[subject].notes[module] = files.map(file => {
                        const filePath = path.join(moduleDir, file);
                        const stats = fs.statSync(filePath);
                        return {
                            name: file.replace(/^\d+-/, ''),
                            filename: file,
                            size: stats.size,
                            url: `/uploads/${semester}/${subject}/notes/${module}/${file}`,
                            uploadDate: stats.mtime.toISOString()
                        };
                    });
                } else {
                    resources[subject].notes[module] = [];
                }
            });
        }
        
        // Handle question papers with years
        const qpDir = path.join(subjectDir, 'questionPapers');
        if (fs.existsSync(qpDir)) {
            resources[subject].questionPapers = {};
            ['year2023', 'year2022', 'year2021'].forEach(year => {
                const yearDir = path.join(qpDir, year);
                if (fs.existsSync(yearDir)) {
                    const files = fs.readdirSync(yearDir);
                    resources[subject].questionPapers[year] = files.map(file => {
                        const filePath = path.join(yearDir, file);
                        const stats = fs.statSync(filePath);
                        return {
                            name: file.replace(/^\d+-/, ''),
                            filename: file,
                            size: stats.size,
                            url: `/uploads/${semester}/${subject}/questionPapers/${year}/${file}`,
                            uploadDate: stats.mtime.toISOString()
                        };
                    });
                } else {
                    resources[subject].questionPapers[year] = [];
                }
            });
        }
        
        // Handle syllabus
        const syllabusDir = path.join(subjectDir, 'syllabus');
        if (fs.existsSync(syllabusDir)) {
            const files = fs.readdirSync(syllabusDir);
            resources[subject].syllabus = files.map(file => {
                const filePath = path.join(syllabusDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file.replace(/^\d+-/, ''),
                    filename: file,
                    size: stats.size,
                    url: `/uploads/${semester}/${subject}/syllabus/${file}`,
                    uploadDate: stats.mtime.toISOString()
                };
            });
        }
    });
    
    res.json({ success: true, resources });
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Start server
app.listen(PORT, () => {
    console.log(`AGMR Notes Server running on http://localhost:${PORT}`);
    console.log(`Admin login: http://localhost:${PORT}/admin-login.html`);
});
