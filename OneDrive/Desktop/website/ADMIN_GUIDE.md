# Admin Guide - AGMR Notes

## Features Implemented

### 1. **Module-Based Notes System**
- Each subject automatically has 5 modules (Module 1 to Module 5)
- Admin can upload notes for each module separately
- Users see module-wise notes with download buttons

### 2. **Previous Year Question Papers**
- 3 years of question papers (2023, 2022, 2021)
- Admin can upload question papers for each year
- Users can download year-wise question papers

### 3. **Add New Subjects**
- Admin can add new subjects dynamically
- When a new subject is added, 5 modules are automatically created
- No need to manually create module structure

## How to Use Admin Dashboard

### Login
1. Go to: http://localhost:3000/admin-login.html
2. Username: `admin`
3. Password: `admin123`

### Adding a New Subject

1. **Select Semester** (3rd to 8th)
2. **Enter New Subject Name** in the "Or Add New Subject" field
3. **Click "Add Subject" button**
4. The system will automatically create:
   - 5 modules for notes (Module 1-5)
   - 3 year slots for question papers (2023, 2022, 2021)
   - Syllabus section

### Uploading Notes

1. **Select Semester**
2. **Select Subject** from dropdown (or add new)
3. **Select Module** (Module 1 to Module 5)
4. **Choose PDF file(s)**
5. **Click "Upload Notes"**

The notes will be organized as:
- Subject → Module 1 → Your PDF
- Subject → Module 2 → Your PDF
- etc.

### Uploading Question Papers

1. **Select Semester**
2. **Select Subject** from dropdown
3. **Select Year** (2023, 2022, or 2021)
4. **Choose PDF file(s)**
5. **Click "Upload Question Papers"**

### Uploading Syllabus

1. **Select Semester**
2. **Select Subject** from dropdown
3. **Choose PDF file**
4. **Click "Upload Syllabus"**

## User Experience

### For Students:

1. **Browse Semesters** - Select from 3rd to 8th semester
2. **View Subjects** - See all subjects for that semester
3. **Click "Notes"** - Expands to show 5 modules
4. **Click "Previous Question Papers"** - Shows 3 years of papers
5. **Download for FREE** - All resources are free to download

## File Organization

Files are stored in this structure:
```
uploads/
├── 3/                          (Semester 3)
│   ├── Data Structures/
│   │   ├── notes/
│   │   │   ├── module1/
│   │   │   │   └── file.pdf
│   │   │   ├── module2/
│   │   │   ├── module3/
│   │   │   ├── module4/
│   │   │   └── module5/
│   │   ├── questionPapers/
│   │   │   ├── year2023/
│   │   │   ├── year2022/
│   │   │   └── year2021/
│   │   └── syllabus/
│   └── [Other Subjects]/
├── 4/                          (Semester 4)
└── [Other Semesters]/
```

## Tips

1. **File Names**: Use descriptive names for uploaded files
2. **File Size**: Maximum 50MB per file
3. **File Types**: Only PDF and DOC files are allowed
4. **Multiple Files**: You can upload multiple files at once
5. **Organization**: Always select the correct module/year before uploading

## Troubleshooting

- **"Please select or enter a subject name"**: Make sure you've selected a subject or entered a new one
- **"No files uploaded"**: Select at least one file before clicking upload
- **Backend not available**: If you see "Demo Mode", the server is not running. Start it with `npm start`

## Default Subjects

The system comes with pre-configured subjects for each semester. You can add more subjects as needed using the "Add Subject" feature.
