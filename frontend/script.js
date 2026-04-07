const API_URL = 'http://localhost:3000/api';

// --- Utility Functions ---

function getAuthUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function setAuthUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function checkAuth(roleRequired = null) {
    const user = getAuthUser();
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    
    if (roleRequired && user.role !== roleRequired) {
        if (user.role === 'teacher') window.location.href = 'teacher-dashboard.html';
        else window.location.href = 'student-dashboard.html';
    }
    
    // Update navbar if present
    const userNameEl = document.getElementById('navbar-user-name');
    if (userNameEl) userNameEl.textContent = `Hello, ${user.name}`;
    
    return user;
}

function renderNavbar() {
    const user = getAuthUser();
    if (!user) return;
    
    document.write(`
        <nav class="navbar">
            <a href="${user.role === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html'}" class="navbar-brand">PeerCollaborate</a>
            <div class="navbar-user">
                <span id="navbar-user-name">Hello, ${user.name}</span>
                <a onclick="logout()" class="logout-link">Logout</a>
            </div>
        </nav>
    `);
}

// --- API Calls ---

async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);
    
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'API Error');
    }
    return data;
}

// Authentication
async function login(email, password) {
    return apiCall('/login', 'POST', { email, password });
}

async function register(name, email, password, role) {
    return apiCall('/register', 'POST', { name, email, password, role });
}

// Assignments
async function getAssignments() {
    return apiCall('/assignments', 'GET');
}

async function createAssignment(title, description, deadline, createdBy) {
    return apiCall('/assignments', 'POST', { title, description, deadline, createdBy });
}

// Submissions
async function getSubmissions(assignmentId = null, studentId = null) {
    let url = '/submissions?';
    if (assignmentId) url += `assignmentId=${assignmentId}&`;
    if (studentId) url += `studentId=${studentId}`;
    return apiCall(url, 'GET');
}

async function submitProject(studentId, assignmentId, fileName) {
    return apiCall('/submit', 'POST', { studentId, assignmentId, fileName });
}

// Reviews
async function getReviews(submissionId = null, reviewerId = null) {
    let url = '/reviews?';
    if (submissionId) url += `submissionId=${submissionId}&`;
    if (reviewerId) url += `reviewerId=${reviewerId}`;
    return apiCall(url, 'GET');
}

async function submitReview(reviewerId, submissionId, rating, comment) {
    return apiCall('/review', 'POST', { reviewerId, submissionId, rating, comment });
}
