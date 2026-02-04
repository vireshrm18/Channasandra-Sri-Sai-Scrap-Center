// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Load resources for semester pages
async function loadSemesterResources(semester) {
    const subjectList = document.querySelector('.subject-list');
    
    if (!subjectList) return;
    
    let resources = {};
    
    // Try to load from backend first
    try {
        const response = await fetch(`http://localhost:3000/api/resources/${semester}`, {
            signal: AbortSignal.timeout(2000)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                resources = result.resources;
            }
        }
    } catch (error) {
        console.log('Backend not available, using localStorage');
    }
    
    // Fallback to localStorage
    if (Object.keys(resources).length === 0) {
        const localResources = JSON.parse(localStorage.getItem('studyResources') || '{}');
        resources = localResources[semester] || {};
    }
    
    if (Object.keys(resources).length === 0) {
        // Show default subjects if no resources uploaded
        return;
    }
    
    // Clear existing subjects
    subjectList.innerHTML = '';
    
    // Add subjects from resources
    for (const [subject, files] of Object.entries(resources)) {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item';
        
        let notesLinks = '';
        let questionPapersLinks = '';
        let syllabusLinks = '';
        
        // Generate notes links
        if (files.notes && files.notes.length > 0) {
            notesLinks = files.notes.map((file, index) => 
                `<a href="${file.url}" class="resource-btn notes" download="${file.name}" target="_blank">📝 ${file.name}</a>`
            ).join('');
        } else {
            notesLinks = '<a href="#" class="resource-btn notes disabled">📝 Notes (Coming Soon)</a>';
        }
        
        // Generate question papers links
        if (files.questionPapers && files.questionPapers.length > 0) {
            questionPapersLinks = files.questionPapers.map((file, index) => 
                `<a href="${file.url}" class="resource-btn question-papers" download="${file.name}" target="_blank">📄 ${file.name}</a>`
            ).join('');
        } else {
            questionPapersLinks = '<a href="#" class="resource-btn question-papers disabled">📄 Question Papers (Coming Soon)</a>';
        }
        
        // Generate syllabus links
        if (files.syllabus && files.syllabus.length > 0) {
            syllabusLinks = files.syllabus.map((file, index) => 
                `<a href="${file.url}" class="resource-btn syllabus" download="${file.name}" target="_blank">📋 ${file.name}</a>`
            ).join('');
        } else {
            syllabusLinks = '<a href="#" class="resource-btn syllabus disabled">📋 Syllabus (Coming Soon)</a>';
        }
        
        subjectItem.innerHTML = `
            <h3>${subject}</h3>
            <div class="resource-buttons">
                ${notesLinks}
                ${questionPapersLinks}
                ${syllabusLinks}
            </div>
        `;
        
        subjectList.appendChild(subjectItem);
    }
}

// Toggle modules display
function toggleModules(button, subjectName) {
    const subjectItem = button.closest('.subject-item');
    const modulesSection = subjectItem.querySelector('.modules-section');
    
    if (modulesSection.style.display === 'none') {
        modulesSection.style.display = 'block';
        button.textContent = '📝 Notes ▲';
        
        // Load module resources from backend/localStorage
        loadModuleResources(subjectItem, subjectName);
    } else {
        modulesSection.style.display = 'none';
        button.textContent = '📝 Notes';
    }
}

// Toggle question papers display
function toggleQuestionPapers(button, subjectName) {
    const subjectItem = button.closest('.subject-item');
    const questionPapersSection = subjectItem.querySelector('.question-papers-section');
    
    if (questionPapersSection.style.display === 'none') {
        questionPapersSection.style.display = 'block';
        button.textContent = '📄 Previous Question Papers ▲';
    } else {
        questionPapersSection.style.display = 'none';
        button.textContent = '📄 Previous Question Papers';
    }
}

// Load module resources
async function loadModuleResources(subjectItem, subjectName) {
    // This function will be enhanced to load actual uploaded files
    // For now, it shows the default structure
    console.log('Loading modules for:', subjectName);
}

// Auto-detect semester and load resources
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const semesterMatch = path.match(/sem(\d+)\.html/);
    
    if (semesterMatch) {
        const semester = semesterMatch[1];
        loadSemesterResources(semester);
    }
    
    console.log('AGMR Notes website loaded successfully!');
});
