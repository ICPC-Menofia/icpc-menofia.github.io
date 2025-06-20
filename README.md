# ICPC Menofia Community Website

This repository contains the source code for the official website of the ICPC Menofia Community, built with  [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme.

The website serves as a central hub for our community, providing access to training materials, session recordings, event announcements, and resources for competitive programmers at Menofia University.

## Getting Started

Follow these instructions to set up a local development environment, run the website, and contribute to its content.

### Prerequisites

- [Python 3.8+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/) (Python's package installer)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ICPC-Menofia/menofia-roadmap.git
    cd menofia-roadmap
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    # For Linux/macOS
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

### Running the Website Locally

To preview the website on your local machine, run the following command:

```bash
mkdocs serve
```

This will start a local development server, and you can view the site by opening your browser to `http://127.0.0.1:8000/`. The server automatically reloads the site whenever you make changes to the files.

## Project Structure

The repository is organized to make content management straightforward:

-   `mkdocs.yml`: The main configuration file for the website. It defines the site's structure, navigation, theme, and plugins.
-   `docs/`: This directory contains all the Markdown files that are converted into the website's pages.
    -   `index.md`: The homepage of the site.
    -   `assets/`: Contains all static assets like CSS stylesheets (`custom.css`) and images.
    -   `community/`: Pages related to the community, such as "About Us" and "Join Us."
    -   `training/`: Contains training plans, materials, and yearly archives.
    -   `resources/`: Includes the FAQ and the archive of community sessions.
    -   `news/`: Event announcements and yearly recaps.
-   `requirements.txt`: A list of the Python packages required to build and serve the site.

## How to Contribute

We welcome contributions from everyone in the community! Whether you're fixing a typo, adding new training material, or updating an event page, your help is appreciated.

### Contribution Workflow

1.  **Fork the repository:** Create a personal copy of the project by forking it to your GitHub account.
2.  **Create a new branch:** For each new feature or fix, create a new branch from `main`.
    ```bash
    git checkout -b your-feature-name
    ```
3.  **Make your changes:** Edit or add Markdown files in the `docs/` directory. Remember to follow the existing style and structure.
4.  **Commit your changes:** Write a clear and concise commit message.
    ```bash
    git commit -am "feat: Add new section to Level 2 training"
    ```
5.  **Push to your branch:**
    ```bash
    git push origin your-feature-name
    ```
6.  **Submit a Pull Request:** Open a pull request from your forked repository to the `main` branch of the official repository. Provide a clear description of the changes you've made.

### Areas for Contribution

-   **Content:** Add or update training materials, session details, or FAQ answers.
-   **Corrections:** Fix typos, broken links, or grammatical errors.
-   **Ideas:** Suggest new pages or sections by opening an issue.

Thank you for helping us build a better resource for the entire ICPC Menofia Community!