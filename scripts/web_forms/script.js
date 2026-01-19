// Global variables
let sessionTopics = [];

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and forms
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.form-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding form
    event.target.classList.add('active');
    document.getElementById(`${tabName}-form`).classList.add('active');
}

// Topics handling for session form
function initializeTopicsInput() {
    const topicInput = document.getElementById('topic-input');
    const topicsContainer = document.getElementById('topics-container');
    
    topicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const topic = this.value.trim();
            if (topic && !sessionTopics.includes(topic)) {
                sessionTopics.push(topic);
                renderTopics();
                this.value = '';
            }
        }
    });
}

function renderTopics() {
    const topicsContainer = document.getElementById('topics-container');
    const topicInput = document.getElementById('topic-input');
    
    // Clear existing topic tags (but keep the input)
    const existingTags = topicsContainer.querySelectorAll('.topic-tag');
    existingTags.forEach(tag => tag.remove());
    
    // Add topic tags
    sessionTopics.forEach((topic, index) => {
        const topicTag = document.createElement('div');
        topicTag.className = 'topic-tag';
        topicTag.innerHTML = `
            ${topic}
            <span class="topic-remove" onclick="removeTopic(${index})">×</span>
        `;
        topicsContainer.insertBefore(topicTag, topicInput);
    });
}

function removeTopic(index) {
    sessionTopics.splice(index, 1);
    renderTopics();
}

// Form validation
function validateCoachForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Validate URLs if provided
    const urlFields = ['linkedin', 'github', 'codeforces'];
    urlFields.forEach(field => {
        if (formData[field] && !isValidUrl(formData[field])) {
            errors.push(`${field} must be a valid URL`);
        }
    });
    
    return errors;
}

function validateSessionForm(formData) {
    const errors = [];
    
    if (!formData.title || formData.title.trim().length < 3) {
        errors.push('Title must be at least 3 characters long');
    }
    
    if (!formData.level) {
        errors.push('Level is required');
    }
    
    // Validate URLs if provided
    const urlFields = ['recording_url', 'slides_url', 'problems_url', 'code_url'];
    urlFields.forEach(field => {
        if (formData[field] && !isValidUrl(formData[field])) {
            errors.push(`${field.replace('_url', '')} URL must be valid`);
        }
    });
    
    return errors;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Form submission handling
function handleCoachSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const coachData = Object.fromEntries(formData.entries());
    
    // Clean up empty fields
    Object.keys(coachData).forEach(key => {
        if (!coachData[key] || coachData[key].trim() === '') {
            delete coachData[key];
        }
    });
    
    // Validate form
    const errors = validateCoachForm(coachData);
    if (errors.length > 0) {
        showMessage(errors.join('\n'), 'error');
        return;
    }
    
    // Show the generated data (in a real implementation, this would be sent to a backend)
    const jsonData = JSON.stringify(coachData, null, 2);
    
    showMessage(`Coach data generated successfully!\n\nTo add this coach, run:\npython scripts/add_coach.py --data '${JSON.stringify(coachData)}'`, 'success');
    
    // Reset form
    e.target.reset();
}

function handleSessionSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const sessionData = Object.fromEntries(formData.entries());
    
    // Add topics array
    sessionData.topics = sessionTopics;
    
    // Clean up empty fields
    Object.keys(sessionData).forEach(key => {
        if (key !== 'topics' && (!sessionData[key] || sessionData[key].trim() === '')) {
            delete sessionData[key];
        }
    });
    
    // Validate form
    const errors = validateSessionForm(sessionData);
    if (errors.length > 0) {
        showMessage(errors.join('\n'), 'error');
        return;
    }
    
    // Show the generated data
    const jsonData = JSON.stringify(sessionData, null, 2);
    
    showMessage(`Session data generated successfully!\n\nTo add this session, run:\npython scripts/add_resource.py --data '${JSON.stringify(sessionData)}'`, 'success');
    
    // Reset form and topics
    e.target.reset();
    sessionTopics = [];
    renderTopics();
}

// Utility function to show messages
function showMessage(message, type) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    statusDiv.style.display = 'block';
    
    // Auto-hide after 10 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 10000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize topics input
    initializeTopicsInput();
    
    // Set up form submissions
    document.getElementById('coachForm').addEventListener('submit', handleCoachSubmission);
    document.getElementById('sessionForm').addEventListener('submit', handleSessionSubmission);
    
    // Set default date to today
    const dateInput = document.getElementById('session-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}); 