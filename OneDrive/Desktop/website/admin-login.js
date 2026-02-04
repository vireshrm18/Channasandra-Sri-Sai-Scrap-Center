// Admin Login Handler
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Simple authentication (In production, use proper backend authentication)
    // Default credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
        // Store login status
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        
        // Redirect to dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});
