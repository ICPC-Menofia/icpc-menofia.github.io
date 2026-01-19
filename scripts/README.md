# Content Management Automation

This directory contains scripts and tools to automate the addition of coaches and resources to the ICPC Menofia website.

## Features

- **Web Form Interface**: Beautiful, user-friendly forms for adding coaches and sessions
- **Command Line Tools**: Scripts for programmatic content addition
- **Flask Backend**: API endpoints for form submissions
- **GitHub Actions**: Automated deployment when content is added
- **Validation**: Built-in validation for all inputs

## Quick Start

### 1. Using the Web Form Interface

Start the Flask server to access the web forms:

```bash
cd scripts
python process_form_submission.py
```

Then open your browser to `http://localhost:5000` to access the form interface.

### 2. Using Command Line Tools

#### Adding a Coach

```bash
python scripts/add_coach.py --data '{
    "name": "John Doe",
    "title": "Software Engineer",
    "company": "Example Corp",
    "achievements": "ECPC Bronze Medialist | 2x ACPC finalist",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "codeforces": "https://codeforces.com/profile/johndoe"
}'
```

#### Adding a Session

```bash
python scripts/add_resource.py --data '{
    "title": "Dynamic Programming Fundamentals",
    "level": "level1",
    "date": "2025-01-15",
    "instructor": "John Doe",
    "description": "Introduction to dynamic programming concepts",
    "topics": ["Dynamic Programming", "Memoization", "Optimization"],
    "recording_url": "https://youtube.com/watch?v=example",
    "slides_url": "https://docs.google.com/presentation/example"
}'
```

### 3. Using GitHub Actions (Creates Pull Request)

You can also add content through GitHub Actions with review process:

1. Go to your repository's "Actions" tab
2. Click on "Content Management" workflow
3. Click "Run workflow"
4. Select the content type and provide JSON data
5. A pull request will be automatically created for review
6. Review and merge the PR to deploy changes

## File Structure

```
scripts/
├── add_coach.py              # Script to add coaches
├── add_resource.py           # Script to add sessions/resources
├── process_form_submission.py # Flask backend for web forms
├── web_forms/
│   ├── index.html           # Web form interface
│   └── script.js            # Frontend JavaScript
└── README.md                # This file
```

## API Endpoints

When running the Flask server, the following endpoints are available:

- `GET /` - Web form interface
- `POST /api/add-coach` - Add a new coach
- `POST /api/add-session` - Add a new session
- `POST /api/validate-coach` - Validate coach data
- `POST /api/validate-session` - Validate session data
- `GET /health` - Health check

## Coach Data Schema

```json
{
    "name": "string (required)",
    "title": "string (optional)",
    "company": "string (optional)",
    "achievements": "string (optional)",
    "linkedin": "url (optional)",
    "github": "url (optional)",
    "codeforces": "url (optional)"
}
```

## Session Data Schema

```json
{
    "title": "string (required)",
    "level": "string (required, one of: general, newcomer, level1, level2, senior)",
    "date": "string (optional, YYYY-MM-DD format)",
    "instructor": "string (optional)",
    "description": "string (optional)",
    "topics": ["array of strings (optional)"],
    "recording_url": "url (optional)",
    "slides_url": "url (optional)",
    "problems_url": "url (optional)",
    "code_url": "url (optional)"
}
```

## Requirements

- Python 3.7+
- Flask
- flask-cors
- mkdocs
- mkdocs-material

Install all requirements:

```bash
pip install -r requirements.txt
```

## Development

### Running Tests

```bash
# Test adding a sample coach
python scripts/add_coach.py --data '{"name": "Test Coach", "title": "Test Title"}'

# Test adding a sample session
python scripts/add_resource.py --data '{"title": "Test Session", "level": "general"}'
```

### Starting the Development Server

```bash
cd scripts
python process_form_submission.py
```

The server will start on `http://localhost:5000` with debug mode enabled.

## Deployment

The system includes GitHub Actions with pull request workflow:

1. Manual workflow dispatch creates pull requests for content addition
2. Pull requests include automatic validation and site build testing
3. Content changes require review before merging to main branch
4. Main branch pushes trigger automatic site deployment
5. Failed builds are automatically detected and reported

## Security Considerations

- All inputs are validated before processing
- URLs are checked for validity
- File paths are sanitized to prevent directory traversal
- JSON parsing includes error handling

## Troubleshooting

### Common Issues

1. **File not found errors**: Ensure you're running scripts from the project root
2. **Permission errors**: Check file permissions on the docs directory
3. **JSON parsing errors**: Validate JSON syntax before submission
4. **URL validation failures**: Ensure URLs include protocol (http/https)

### Getting Help

If you encounter issues:

1. Check the console output for specific error messages
2. Verify your JSON data format
3. Ensure all required fields are provided
4. Check file permissions and paths

## Future Enhancements

- [ ] Image upload support for coach profiles
- [ ] Bulk import from CSV/Excel files
- [ ] Content moderation workflow
- [ ] Email notifications for new submissions
- [ ] Advanced search and filtering in web interface
- [ ] Integration with external APIs (LinkedIn, GitHub) 