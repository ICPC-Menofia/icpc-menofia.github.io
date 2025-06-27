#!/usr/bin/env python3
"""
Flask backend to handle form submissions for adding coaches and resources
This can be used as a webhook endpoint or run as a local server
"""

import json
import os
import sys
from pathlib import Path
from flask import Flask, request, jsonify, render_template_string, send_from_directory
from flask_cors import CORS

# Add scripts directory to path to import our modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from add_coach import add_coach_to_file
from add_resource import add_session_to_file, get_session_file_path

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
COACH_FILE = '../docs/community/coaches.md'
UPLOAD_FOLDER = 'temp_uploads'

@app.route('/')
def index():
    """Serve the form interface"""
    try:
        with open('web_forms/index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Form interface not found. Please ensure index.html exists in web_forms/", 404

@app.route('/script.js')
def serve_js():
    """Serve the JavaScript file"""
    try:
        return send_from_directory('web_forms', 'script.js')
    except FileNotFoundError:
        return "JavaScript file not found", 404

@app.route('/api/add-coach', methods=['POST'])
def add_coach():
    """Add a new coach via API"""
    try:
        coach_data = request.json
        
        if not coach_data:
            return jsonify({'error': 'No data provided'}), 400
        
        if 'name' not in coach_data:
            return jsonify({'error': 'Coach name is required'}), 400
        
        # Add coach to file
        add_coach_to_file(coach_data, COACH_FILE)
        
        return jsonify({
            'message': f"Successfully added coach: {coach_data['name']}",
            'coach_data': coach_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/add-session', methods=['POST'])
def add_session():
    """Add a new session via API"""
    try:
        session_data = request.json
        
        if not session_data:
            return jsonify({'error': 'No data provided'}), 400
        
        if 'title' not in session_data:
            return jsonify({'error': 'Session title is required'}), 400
        
        if 'level' not in session_data:
            return jsonify({'error': 'Session level is required'}), 400
        
        # Get the appropriate file path
        file_path = get_session_file_path(session_data['level'])
        if not file_path:
            return jsonify({'error': f"Invalid level: {session_data['level']}"}), 400
        
        # Add session to file
        add_session_to_file(session_data, file_path)
        
        return jsonify({
            'message': f"Successfully added session: {session_data['title']}",
            'session_data': session_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/validate-coach', methods=['POST'])
def validate_coach():
    """Validate coach data without adding"""
    try:
        coach_data = request.json
        
        errors = []
        
        if not coach_data.get('name') or len(coach_data['name'].strip()) < 2:
            errors.append('Name must be at least 2 characters long')
        
        # Validate URLs if provided
        url_fields = ['linkedin', 'github', 'codeforces']
        for field in url_fields:
            if coach_data.get(field) and not is_valid_url(coach_data[field]):
                errors.append(f'{field} must be a valid URL')
        
        if errors:
            return jsonify({'valid': False, 'errors': errors}), 400
        
        return jsonify({'valid': True, 'message': 'Coach data is valid'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/validate-session', methods=['POST'])
def validate_session():
    """Validate session data without adding"""
    try:
        session_data = request.json
        
        errors = []
        
        if not session_data.get('title') or len(session_data['title'].strip()) < 3:
            errors.append('Title must be at least 3 characters long')
        
        if not session_data.get('level'):
            errors.append('Level is required')
        
        # Validate URLs if provided
        url_fields = ['recording_url', 'slides_url', 'problems_url', 'code_url']
        for field in url_fields:
            if session_data.get(field) and not is_valid_url(session_data[field]):
                errors.append(f'{field.replace("_url", "")} URL must be valid')
        
        if errors:
            return jsonify({'valid': False, 'errors': errors}), 400
        
        return jsonify({'valid': True, 'message': 'Session data is valid'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Form submission service is running'}), 200

def is_valid_url(url):
    """Check if a URL is valid"""
    try:
        from urllib.parse import urlparse
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def create_upload_folder():
    """Create upload folder if it doesn't exist"""
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

if __name__ == '__main__':
    create_upload_folder()
    
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run in debug mode for development
    app.run(debug=True, host='0.0.0.0', port=port) 