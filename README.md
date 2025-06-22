# ICPC Menofia Community Website

This repository contains the source code for the official website of the ICPC Menofia Community. The site is built using the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme and provides centralized access to training plans, session recordings, event updates, and competitive programming resources for Menofia University students.

---

## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

* [Python 3.8+](https://www.python.org/downloads/)
* [pip](https://pip.pypa.io/en/stable/installation/)

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ICPC-Menofia/icpc-menofia.github.io.git
   cd icpc-menofia.github.io
   ```

2. (Optional) Create and activate a virtual environment:

   ```bash
   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate

   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. Install required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

### Running the Website Locally

Start the development server:

```bash
mkdocs serve
```

Then navigate to `http://127.0.0.1:8000/` in your browser. The site supports auto-refresh on content changes.

---

## Project Structure

* `mkdocs.yml`: Main configuration file (theme settings, navigation, plugins).
* `docs/`: All documentation and content files in Markdown format.

  * `index.md`: Homepage
  * `community/`: Community overview, how to join, etc.
  * `training/`: Training plans and related material
  * `resources/`: FAQs, session archives, and helpful links
  * `news/`: Announcements and events
  * `assets/`: Images and custom CSS
* `requirements.txt`: Python dependencies

---

## Contributing

Contributions are welcome. You can help by fixing typos, updating outdated content, or suggesting new additions.

### Contribution Guide

If you are new to contributing, refer to this [video tutorial series](https://youtube.com/playlist?list=PLAw15AnTPFl_CS8sljvkNdf6WDf0LwHlM) for detailed instructions.

### Workflow

1. Fork the repository on GitHub.

2. Create a feature branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes in the `docs/` folder.

4. Commit your changes:

   ```bash
   git commit -am "feat: Add new training resource"
   ```

5. Push your branch:

   ```bash
   git push origin feature-name
   ```

6. Open a pull request targeting the `main` branch.

### Areas You Can Help With

* Adding or revising training content
* Fixing broken links or formatting issues
* Suggesting or drafting new sections (feel free to open an issue)

---

**Thank you for helping improve the ICPC Menofia Community website. 💙**
