# ICPC Menofia Community Website

This repository contains the source code for the official website of the ICPC Menofia Community. It's built using the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme.

The site provides easy access to training plans, session recordings, events, and helpful resources for competitive programmers at Menofia University.

---

## 🚀 Get Started

Follow these steps to run the website locally and contribute.

### ✅ Requirements

* [Python 3.8+](https://www.python.org/downloads/)
* [pip](https://pip.pypa.io/en/stable/installation/)

### 🛠️ Setup

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/ICPC-Menofia/menofia-roadmap.git](https://github.com/ICPC-Menofia/icpc-menofia.github.io.git)
   cd icpc-menofia.github.io
   ```

2. **Create and activate a virtual environment (optional but recommended):**

   ```bash
   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate

   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

### ▶️ Run the website

Start the local server:

```bash
mkdocs serve
```

Then open your browser at `http://127.0.0.1:8000/`. The site will auto-refresh on changes.

---

## 📁 Project Structure

* `mkdocs.yml`: Website configuration (theme, nav, plugins).
* `docs/`: All website content (Markdown files).

  * `index.md`: Homepage
  * `community/`: About, Join Us, etc.
  * `training/`: Training plans and materials
  * `resources/`: FAQs and session archives
  * `news/`: Events and announcements
  * `assets/`: Images and custom CSS
* `requirements.txt`: List of required Python packages

---

## 🤝 Contribute

Everyone is welcome to contribute! You can fix typos, update content, or suggest new ideas.

### 🧭 Workflow

1. **Fork** this repo on GitHub
2. **Create a new branch**:

   ```bash
   git checkout -b feature-name
   ```
3. **Make changes** in the `docs/` folder
4. **Commit**:

   ```bash
   git commit -am "feat: Add new training resource"
   ```
5. **Push**:

   ```bash
   git push origin feature-name
   ```
6. **Open a Pull Request** to the `main` branch

### 📌 You can help with:

* Adding or updating training content
* Fixing typos and broken links
* Suggesting new sections (open an issue!)

---

Thanks for helping improve the ICPC Menofia Community website! 💙
