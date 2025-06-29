#!/bin/bash

# Manual PR preview deployment script
# Usage: ./scripts/manual-pr-deploy.sh <PR_NUMBER>

PR_NUMBER=${1:-31}

echo "Deploying manual preview for PR #$PR_NUMBER"

# Create preview configuration
cp mkdocs.yml mkdocs-manual.yml
echo "site_url: https://icpc-menofia.github.io/menofia-roadmap/pr-$PR_NUMBER/" >> mkdocs-manual.yml
echo "use_directory_urls: true" >> mkdocs-manual.yml

# Build site
echo "Building site..."
mkdocs build --config-file mkdocs-manual.yml --site-dir manual-preview

# Add PR banner
echo "<div style='background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 10px 0; border-radius: 5px;'>" > pr-banner.html
echo "<strong>PR Preview #$PR_NUMBER (Manual Deploy)</strong><br>" >> pr-banner.html
echo "This is a preview of changes from Pull Request #$PR_NUMBER<br>" >> pr-banner.html
echo "<small>Last updated: $(date -u +'%Y-%m-%d %H:%M:%S UTC')</small>" >> pr-banner.html
echo "</div>" >> pr-banner.html

# Insert banner into index.html
if [ -f "manual-preview/index.html" ]; then
  sed -i '/<body[^>]*>/r pr-banner.html' manual-preview/index.html
fi

# Clone gh-pages branch
echo "Cloning gh-pages branch..."
git clone --single-branch --branch gh-pages . gh-pages-manual

# Copy to PR directory
echo "Copying files to pr-$PR_NUMBER directory..."
mkdir -p gh-pages-manual/pr-$PR_NUMBER
cp -r manual-preview/* gh-pages-manual/pr-$PR_NUMBER/

# Deploy
cd gh-pages-manual
git config --local user.email "manual@deploy.local"
git config --local user.name "Manual Deploy"

echo "Files in pr-$PR_NUMBER:"
ls -la pr-$PR_NUMBER/

# Add and commit
git add pr-$PR_NUMBER
git commit -m "Manual deploy PR #$PR_NUMBER preview"

echo "Pushing to gh-pages..."
git push origin gh-pages

echo "Manual deployment completed!"
echo "Preview should be available at: https://icpc-menofia.github.io/menofia-roadmap/pr-$PR_NUMBER/"

# Cleanup
cd ..
rm -rf manual-preview gh-pages-manual mkdocs-manual.yml pr-banner.html

echo "Cleanup completed. Wait 1-10 minutes for GitHub Pages to update." 