#!/usr/bin/env python3
"""
Manual cleanup script for PR previews.
This script can be run manually to clean up old PR preview directories.
"""

import os
import subprocess
import sys
import argparse
from pathlib import Path

def run_command(cmd, cwd=None):
    """Run a shell command and return the result."""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
        return result.returncode == 0, result.stdout.strip(), result.stderr.strip()
    except Exception as e:
        return False, "", str(e)

def list_pr_previews():
    """List all PR preview directories in gh-pages branch."""
    print("Checking gh-pages branch for PR preview directories...")
    
    # Clone or checkout gh-pages branch
    if not os.path.exists("gh-pages-temp"):
        success, stdout, stderr = run_command("git clone --single-branch --branch gh-pages . gh-pages-temp")
        if not success:
            print(f"Failed to clone gh-pages branch: {stderr}")
            return []
    else:
        success, stdout, stderr = run_command("git pull origin gh-pages", cwd="gh-pages-temp")
        if not success:
            print(f"Failed to update gh-pages branch: {stderr}")
    
    # List PR directories
    gh_pages_path = Path("gh-pages-temp")
    pr_dirs = []
    
    if gh_pages_path.exists():
        for item in gh_pages_path.iterdir():
            if item.is_dir() and item.name.startswith("pr-"):
                try:
                    pr_number = int(item.name[3:])  # Remove "pr-" prefix
                    pr_dirs.append((pr_number, item.name))
                except ValueError:
                    # Skip directories that don't follow pr-<number> pattern
                    continue
    
    return sorted(pr_dirs)

def cleanup_preview(pr_number):
    """Clean up a specific PR preview."""
    pr_dir = f"pr-{pr_number}"
    gh_pages_path = Path("gh-pages-temp")
    target_dir = gh_pages_path / pr_dir
    
    if not target_dir.exists():
        print(f"PR preview directory {pr_dir} not found")
        return False
    
    print(f"Removing {pr_dir}...")
    
    # Remove the directory
    success, stdout, stderr = run_command(f"rm -rf {pr_dir}", cwd="gh-pages-temp")
    if not success:
        print(f"Failed to remove directory: {stderr}")
        return False
    
    # Commit and push the change
    commands = [
        "git add .",
        f"git commit -m 'Manual cleanup of {pr_dir} preview'",
        "git push origin gh-pages"
    ]
    
    for cmd in commands:
        success, stdout, stderr = run_command(cmd, cwd="gh-pages-temp")
        if not success and "nothing to commit" not in stderr:
            print(f"Failed to execute '{cmd}': {stderr}")
            return False
    
    print(f"Successfully cleaned up {pr_dir}")
    return True

def main():
    parser = argparse.ArgumentParser(description="Cleanup PR preview directories")
    parser.add_argument("--list", action="store_true", help="List all PR preview directories")
    parser.add_argument("--cleanup", type=int, help="Clean up specific PR number")
    parser.add_argument("--cleanup-all", action="store_true", help="Clean up all PR previews")
    
    args = parser.parse_args()
    
    if not any([args.list, args.cleanup, args.cleanup_all]):
        parser.print_help()
        return
    
    try:
        pr_dirs = list_pr_previews()
        
        if args.list:
            if pr_dirs:
                print("\nFound PR preview directories:")
                for pr_number, dir_name in pr_dirs:
                    print(f"  - {dir_name} (PR #{pr_number})")
                    print(f"    URL: https://icpc-menofia.github.io/menofia-roadmap/{dir_name}/")
            else:
                print("No PR preview directories found")
        
        elif args.cleanup:
            if any(pr_num == args.cleanup for pr_num, _ in pr_dirs):
                cleanup_preview(args.cleanup)
            else:
                print(f"PR #{args.cleanup} preview not found")
        
        elif args.cleanup_all:
            if pr_dirs:
                print(f"Found {len(pr_dirs)} PR preview directories to clean up")
                for pr_number, dir_name in pr_dirs:
                    cleanup_preview(pr_number)
            else:
                print("No PR preview directories found to clean up")
    
    finally:
        # Clean up temp directory
        if os.path.exists("gh-pages-temp"):
            run_command("rm -rf gh-pages-temp")

if __name__ == "__main__":
    main() 