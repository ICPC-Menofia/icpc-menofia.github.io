#!/usr/bin/env python3
"""
Script to add a new coach to the coaches.md file
Usage: python add_coach.py --data '{"name": "John Doe", "title": "Software Engineer", "company": "Example Corp", ...}'
"""

import argparse
import json
import re
from pathlib import Path

def generate_coach_id(name):
    """Generate a unique ID for the coach based on their name"""
    return name.lower().replace(' ', '-').replace('.', '')

def format_coach_entry(coach_data):
    """Format coach data into HTML list item"""
    coach_id = generate_coach_id(coach_data['name'])
    
    entry = f'    <li id="{coach_id}">\n'
    entry += f'        <strong>{coach_data["name"]}</strong>\n'
    
    # Add title and company if provided
    if coach_data.get('title'):
        entry += f'        <small>{coach_data["title"]}'
        if coach_data.get('company'):
            entry += f' at {coach_data["company"]}'
        if coach_data.get('achievements'):
            entry += f' | {coach_data["achievements"]}'
        entry += '</small>\n'
    
    # Add links
    links = []
    if coach_data.get('linkedin'):
        links.append(f'<a href="{coach_data["linkedin"]}" target="_blank">LinkedIn</a>')
    if coach_data.get('github'):
        links.append(f'<a href="{coach_data["github"]}" target="_blank">GitHub</a>')
    if coach_data.get('codeforces'):
        links.append(f'<a href="{coach_data["codeforces"]}" target="_blank">Codeforces</a>')
    
    if links:
        entry += f'        {" | ".join(links)}\n'
    
    entry += '    </li>'
    
    return entry

def add_coach_to_file(coach_data, file_path='docs/community/coaches.md'):
    """Add a new coach to the coaches.md file"""
    file_path = Path(file_path)
    
    if not file_path.exists():
        raise FileNotFoundError(f"File {file_path} not found")
    
    # Read the current file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Generate the new coach entry
    new_entry = format_coach_entry(coach_data)
    
    # Find the position to insert (before the closing </ul> tag)
    ul_close_pattern = r'(\s*</ul>)'
    match = re.search(ul_close_pattern, content)
    
    if not match:
        raise ValueError("Could not find closing </ul> tag in coaches file")
    
    # Insert the new coach entry before the closing </ul>
    insert_position = match.start()
    new_content = (
        content[:insert_position] + 
        new_entry + '\n' +
        content[insert_position:]
    )
    
    # Write the updated content back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully added coach: {coach_data['name']}")

def main():
    parser = argparse.ArgumentParser(description='Add a new coach to the coaches.md file')
    parser.add_argument('--data', required=True, help='JSON string with coach data')
    parser.add_argument('--file', default='docs/community/coaches.md', help='Path to coaches.md file')
    
    args = parser.parse_args()
    
    try:
        coach_data = json.loads(args.data)
        
        # Validate required fields
        if 'name' not in coach_data:
            raise ValueError("Coach name is required")
        
        add_coach_to_file(coach_data, args.file)
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON data: {e}")
        return 1
    except Exception as e:
        print(f"Error adding coach: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main()) 