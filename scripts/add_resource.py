#!/usr/bin/env python3
"""
Script to add a new resource/session to the appropriate session file
Usage: python add_resource.py --data '{"title": "Session Title", "level": "level1", "description": "...", ...}'
"""

import argparse
import json
import re
from pathlib import Path
from datetime import datetime

def format_session_entry(session_data):
    """Format session data into markdown entry"""
    date = session_data.get('date', datetime.now().strftime('%Y-%m-%d'))
    
    entry = f"## {session_data['title']}\n\n"
    entry += f"**Date:** {date}\n\n"
    
    if session_data.get('instructor'):
        entry += f"**Instructor:** {session_data['instructor']}\n\n"
    
    if session_data.get('description'):
        entry += f"**Description:** {session_data['description']}\n\n"
    
    if session_data.get('topics'):
        entry += "**Topics Covered:**\n"
        for topic in session_data['topics']:
            entry += f"- {topic}\n"
        entry += "\n"
    
    # Add links
    links = []
    if session_data.get('recording_url'):
        links.append(f"[📹 Recording]({session_data['recording_url']})")
    if session_data.get('slides_url'):
        links.append(f"[📊 Slides]({session_data['slides_url']})")
    if session_data.get('problems_url'):
        links.append(f"[🔗 Problems]({session_data['problems_url']})")
    if session_data.get('code_url'):
        links.append(f"[💻 Code]({session_data['code_url']})")
    
    if links:
        entry += "**Resources:** " + " | ".join(links) + "\n\n"
    
    entry += "---\n\n"
    
    return entry

def get_session_file_path(level):
    """Get the appropriate session file path based on level"""
    level_mapping = {
        'general': 'docs/resources/sessions/general.md',
        'newcomer': 'docs/resources/sessions/newcomer.md',
        'level1': 'docs/resources/sessions/level1.md',
        'level2': 'docs/resources/sessions/level2.md',
        'senior': 'docs/resources/sessions/senior.md'
    }
    
    return level_mapping.get(level.lower())

def create_session_file_if_not_exists(file_path, level):
    """Create a session file if it doesn't exist"""
    file_path = Path(file_path)
    
    if not file_path.exists():
        # Create the directory if it doesn't exist
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Create basic file structure
        level_titles = {
            'general': 'General Sessions',
            'newcomer': 'Newcomer Sessions', 
            'level1': 'Level 1 Sessions',
            'level2': 'Level 2 Sessions',
            'senior': 'Senior Sessions'
        }
        
        title = level_titles.get(level, f'{level.title()} Sessions')
        
        content = f"""# {title}

This page contains all {level} sessions and resources.

---

"""
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def add_session_to_file(session_data, file_path):
    """Add a new session to the specified session file"""
    file_path = Path(file_path)
    
    # Create file if it doesn't exist
    create_session_file_if_not_exists(file_path, session_data['level'])
    
    # Read the current file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Generate the new session entry
    new_entry = format_session_entry(session_data)
    
    # Add the new session at the end of the file
    new_content = content + new_entry
    
    # Write the updated content back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully added session: {session_data['title']} to {file_path}")

def main():
    parser = argparse.ArgumentParser(description='Add a new session to the appropriate session file')
    parser.add_argument('--data', required=True, help='JSON string with session data')
    
    args = parser.parse_args()
    
    try:
        session_data = json.loads(args.data)
        
        # Validate required fields
        if 'title' not in session_data:
            raise ValueError("Session title is required")
        if 'level' not in session_data:
            raise ValueError("Session level is required")
        
        # Get the appropriate file path
        file_path = get_session_file_path(session_data['level'])
        if not file_path:
            raise ValueError(f"Invalid level: {session_data['level']}")
        
        add_session_to_file(session_data, file_path)
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON data: {e}")
        return 1
    except Exception as e:
        print(f"Error adding session: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main()) 