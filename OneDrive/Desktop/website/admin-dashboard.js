// Check if admin is logged in
if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'admin-login.html';
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    window.location.href = 'admin-login.html';
});

// Initialize resources from localStorage
function initializeResources() {
    if (!localStorage.getItem('studyResources')) {
        localStorage.setItem('studyResources', JSON.stringify({}));
    }
}

// Add new subject with automatic module creation
function addNewSubject() {
    const semester = document.getElementById('semesterSelect').value;
    const subjectName = document.getElementById('subjectInput').value.trim();
    
    if (!subjectName) {
        alert('Please enter a subject name');
        return;
    }
    
    const resources = JSON.parse(localStorage.getItem('studyResources') || '{}');
    
    if (!resources[semester]) {
        resources[semester] = {};
    }
    
    if (resources[semester][subjectName]) {
        alert('Subject already exists!');
        return;
    }
    
    // Create subject with 5 modules automatically
    resources[semester][subjectName] = {
        notes: {
            module1: [],
            module2: [],
            module3: [],
            module4: [],
            module5: []
        },
        questionPapers: {
            year2023: [],
            year2022: [],
            year2021: []
        },
        syllabus: []
    };
    
    localStorage.setItem('studyResources', JSON.stringify(resources));
    
    alert(`Subject "${subjectName}" added successfully with 5 modules!`);
    document.getElementById('subjectInput').value = '';
    loadSubjects();
    loadResources();
}

// Load subjects for selected semester
function loadSubjects() {
    const semester = document.getElementById('semesterSelect').value;
    const subjectSelect = document.getElementById('subjectSelect');
    const resources = JSON.parse(localStorage.getItem('studyResources') || '{}');
    
    subjectSelect.innerHTML = '<option value="">-- Select Existing Subject --</option>';
    
    if (resources[semester]) {
        Object.keys(resources[semester]).forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }
}

// Upload file handler
async function uploadFile(type) {
    const semester = document.getElementById('semesterSelect').value;
    let subject = document.getElementById('subjectSelect').value;
    
    // If no subject selected, check if new subject name is entered
    if (!subject) {
        subject = document.getElementById('subjectInput').value.trim();
    }
    
    const fileInput = document.getElementById(type + 'File');
    const statusDiv = document.getElementById(type + 'Status');
    
    // Get module selection for notes
    let module = null;
    if (type === 'notes') {
        module = document.getElementById('moduleSelect').value;
    }
    
    // Get year selection for question papers
    let year = null;
    if (type === 'questionPapers') {
        year = document.getElementById('yearSelect').value;
    }
    
    if (!subject) {
        statusDiv.textContent = 'Please select or enter a subject name';
        statusDiv.className = 'upload-status error';
        return;
    }
    
    if (!fileInput.files.length) {
        statusDiv.textContent = 'Please select a file';
        statusDiv.className = 'upload-status error';
        return;
    }
    
    // Show uploading status
    statusDiv.textContent = 'Uploading...';
    statusDiv.className = 'upload-status';
    
    // Check if backend is available
    const useBackend = await checkBackend();
    
    if (useBackend) {
        // Upload to backend
        const formData = new FormData();
        formData.append('semester', semester);
        formData.append('subject', subject);
        formData.append('type', type);
        if (module) {
            formData.append('module', module);
        }
        if (year) {
            formData.append('year', year);
        }
        
        Array.from(fileInput.files).forEach(file => {
            formData.append('files', file);
        });
        
        try {
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                let msg = `✓ ${result.files.length} file(s) uploaded successfully`;
                if (module) msg += ` to ${module}`;
                if (year) msg += ` for ${year.replace('year', '')}`;
                statusDiv.textContent = msg;
                statusDiv.className = 'upload-status success';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            statusDiv.textContent = `Error: ${error.message}`;
            statusDiv.className = 'upload-status error';
        }
    } else {
        // Fallback to localStorage (demo mode)
        const resources = JSON.parse(localStorage.getItem('studyResources') || '{}');
        
        if (!resources[semester]) {
            resources[semester] = {};
        }
        
        if (!resources[semester][subject]) {
            resources[semester][subject] = {
                notes: { module1: [], module2: [], module3: [], module4: [], module5: [] },
                questionPapers: { year2023: [], year2022: [], year2021: [] },
                syllabus: []
            };
        }
        
        Array.from(fileInput.files).forEach(file => {
            const fileData = {
                name: file.name,
                size: file.size,
                uploadDate: new Date().toISOString(),
                url: '#', // Demo mode - no actual file
                module: module,
                year: year
            };
            
            if (type === 'notes' && module) {
                if (!resources[semester][subject][type][module]) {
                    resources[semester][subject][type][module] = [];
                }
                resources[semester][subject][type][module].push(fileData);
            } else if (type === 'questionPapers' && year) {
                if (!resources[semester][subject][type][year]) {
                    resources[semester][subject][type][year] = [];
                }
                resources[semester][subject][type][year].push(fileData);
            } else {
                if (!Array.isArray(resources[semester][subject][type])) {
                    resources[semester][subject][type] = [];
                }
                resources[semester][subject][type].push(fileData);
            }
        });
        
        localStorage.setItem('studyResources', JSON.stringify(resources));
        
        let uploadMsg = `✓ ${fileInput.files.length} file(s) uploaded`;
        if (module) uploadMsg += ` to ${module}`;
        if (year) uploadMsg += ` for ${year.replace('year', '')}`;
        uploadMsg += ' (Demo Mode)';
        
        statusDiv.textContent = uploadMsg;
        statusDiv.className = 'upload-status success';
    }
    
    // Clear file input
    fileInput.value = '';
    
    // Refresh resources list
    loadResources();
    
    // Clear status after 5 seconds
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'upload-status';
    }, 5000);
}

// Check if backend is available
async function checkBackend() {
    try {
        const response = await fetch('http://localhost:3000/api/resources/3', {
            method: 'GET',
            signal: AbortSignal.timeout(1000)
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Load and display resources
async function loadResources() {
    const semester = document.getElementById('semesterSelect').value;
    const resourcesList = document.getElementById('resourcesList');
    
    // Try to load from backend first
    const useBackend = await checkBackend();
    let resources = {};
    
    if (useBackend) {
        try {
            const response = await fetch(`http://localhost:3000/api/resources/${semester}`);
            const result = await response.json();
            if (result.success) {
                resources = result.resources;
            }
        } catch (error) {
            console.error('Error loading from backend:', error);
        }
    }
    
    // Fallback to localStorage
    if (Object.keys(resources).length === 0) {
        const localResources = JSON.parse(localStorage.getItem('studyResources') || '{}');
        resources = localResources[semester] || {};
    }
    
    if (Object.keys(resources).length === 0) {
        resourcesList.innerHTML = '<p class="no-resources">No resources uploaded for this semester yet.</p>';
        return;
    }
    
    let html = '';
    for (const [subject, files] of Object.entries(resources)) {
        html += `
            <div class="resource-item">
                <h4>${subject}</h4>
                <div class="resource-details">
                    <div class="resource-type">
                        <strong>Notes:</strong> ${files.notes.length} file(s)
                        ${files.notes.map(f => `<span class="file-tag">${f.name}</span>`).join('')}
                    </div>
                    <div class="resource-type">
                        <strong>Question Papers:</strong> ${files.questionPapers.length} file(s)
                        ${files.questionPapers.map(f => `<span class="file-tag">${f.name}</span>`).join('')}
                    </div>
                    <div class="resource-type">
                        <strong>Syllabus:</strong> ${files.syllabus.length} file(s)
                        ${files.syllabus.map(f => `<span class="file-tag">${f.name}</span>`).join('')}
                    </div>
                </div>
                <button class="btn-delete" onclick="deleteSubject('${semester}', '${subject}')">Delete Subject</button>
            </div>
        `;
    }
    
    resourcesList.innerHTML = html;
}

// Delete subject
function deleteSubject(semester, subject) {
    if (!confirm(`Are you sure you want to delete all resources for "${subject}"?`)) {
        return;
    }
    
    const resources = JSON.parse(localStorage.getItem('studyResources') || '{}');
    if (resources[semester] && resources[semester][subject]) {
        delete resources[semester][subject];
        localStorage.setItem('studyResources', JSON.stringify(resources));
        loadResources();
    }
}

// Event listeners
document.getElementById('semesterSelect').addEventListener('change', function() {
    loadSubjects();
    loadResources();
});

document.getElementById('subjectSelect').addEventListener('change', function() {
    const selectedSubject = this.value;
    if (selectedSubject) {
        document.getElementById('subjectInput').value = '';
    }
});

// Initialize
initializeResources();
loadSubjects();
loadResources();
