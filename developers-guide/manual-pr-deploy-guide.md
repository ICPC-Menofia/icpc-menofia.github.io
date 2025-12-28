# Manual PR Deploy Guide

## Overview

You can now generate PR previews on-demand by commenting on any pull request! This is useful when you want to create a preview from the latest commit without pushing new changes.

## How to Use

### Step 1: Comment on a PR

On any open pull request, simply add a comment with:

```
GitHub generate site
```

### Step 2: Watch the Magic Happen

1. **Instant Response**: The GitHub Actions bot will immediately react with a 🚀 emoji
2. **Initial Comment**: Bot posts a comment showing the build is starting
3. **Build Process**: Site builds from the latest commit on the PR branch
4. **Success Update**: Comment gets updated with the preview link and details

### Step 3: Access Your Preview

Once complete, you'll get:
- **Direct preview URL**: `https://icpc-menofia.github.io/menofia-roadmap/pr-<NUMBER>/`
- **Quick access links** to all major sections
- **Build details** and workflow information

## Example Usage

**Comment:**
```
Hey @reviewer, I've made some changes to the training section. 

GitHub generate site

Please check the preview and let me know what you think!
```

**Bot Response:**
```
## Manual PR Preview Generation Complete ✅

**Preview successfully generated for PR #123**

**Requested by:** @your-username
**Commit:** `abc1234`
**Branch:** `feature/training-updates`

---

### 🔗 Preview Links

**📖 Preview Site:** https://icpc-menofia.github.io/menofia-roadmap/pr-123/

**⚡ Quick Access:**
- [Home Page](https://icpc-menofia.github.io/menofia-roadmap/pr-123/)
- [Community](https://icpc-menofia.github.io/menofia-roadmap/pr-123/community/)
- [Training](https://icpc-menofia.github.io/menofia-roadmap/pr-123/training/)
- [Resources](https://icpc-menofia.github.io/menofia-roadmap/pr-123/resources/)
- [News](https://icpc-menofia.github.io/menofia-roadmap/pr-123/news/)
```

## When to Use Manual Deploy

### **Perfect for:**
- **Design Reviews**: Share visual changes with stakeholders
- **Content Validation**: Let content reviewers see formatted text
- **Mobile Testing**: Test responsive design on actual devices
- **Link Verification**: Check that all links work correctly
- **Demo Purposes**: Show changes to team members or clients

### **Use Cases:**
- You want a preview but don't have new commits to push
- Reviewer asks to see changes in action
- You're demonstrating features in a meeting
- Testing how content looks on the live site
- Sharing changes with non-technical team members

## Features

### **Smart Banner**
Each manual preview includes a special banner showing:
- **PR number** and **who requested** the build
- **Exact commit** the preview was built from
- **Timestamp** of when it was generated
- **Link back to the original PR**

### **Automatic Updates**
- Comment gets updated when build completes
- Includes comprehensive links and details
- Shows build status and any errors
- Provides troubleshooting information if build fails

### **Error Handling**
If the build fails:
- Bot updates the comment with error details
- Provides links to workflow logs
- Suggests troubleshooting steps
- Allows you to retry by commenting again

## Trigger Phrases

The following phrases will trigger a manual deploy:

✅ **Works:**
- `GitHub generate site`
- `Please GitHub generate site for review`
- `GitHub generate site - need to check mobile layout`
- `Can someone review this? GitHub generate site`

❌ **Doesn't work:**
- `generate site` (missing "GitHub")
- `Github generate site` (wrong capitalization)
- `GitHub generate preview` (wrong command)

## Permissions

**Who can trigger:**
- Repository collaborators
- Users with write access
- PR authors
- Repository maintainers

**Who cannot trigger:**
- External contributors without write access
- Bots (other than authorized ones)
- Users without repository permissions

## Tips and Best Practices

### **For Contributors:**
- Use manual deploy when you want feedback on visual changes
- Include context in your comment explaining what to review
- Tag relevant reviewers to check the preview
- Test the preview yourself before asking others to review

### **For Reviewers:**
- Use the quick access links to navigate to relevant sections
- Check both desktop and mobile views
- Verify that all links and functionality work
- Comment back with specific feedback about the preview

### **For Teams:**
- Use manual deploys for demo purposes in meetings
- Share preview links in Slack or other communication tools
- Use for content validation by non-technical team members
- Great for showing progress to stakeholders

## Troubleshooting

### **Preview not generating:**
- Check that you're commenting on an open PR
- Ensure you have write access to the repository
- Verify the exact phrase "GitHub generate site" is used
- Check workflow permissions in repository settings

### **Build failing:**
- Review the workflow logs linked in the error comment
- Test the PR branch locally with `mkdocs serve`
- Check for any MkDocs configuration issues
- Try commenting "GitHub generate site" again to retry

### **Preview shows old content:**
- Wait 5-10 minutes for GitHub Pages to update
- Clear your browser cache
- Try opening in incognito mode
- Check that the build used the correct commit SHA

## Integration with Automatic Previews

Manual deploy works alongside the automatic PR preview system:

- **Automatic**: Triggers on PR creation and updates
- **Manual**: Triggers when you comment "GitHub generate site"
- **Same URL**: Both use the same preview URL format
- **Same Features**: Both include PR banners and proper configuration

You can use both systems together - automatic for regular updates and manual for on-demand generation.

---

## Developer Section

### **Architecture Overview**

The manual PR deploy system consists of:

1. **Workflow Trigger**: `.github/workflows/manual-pr-deploy.yml`
2. **Comment Detection**: Uses `issue_comment` event with `contains()` filter
3. **Build Process**: MkDocs build with PR-specific configuration
4. **Deployment**: Manual git operations to gh-pages branch
5. **Feedback Loop**: Bot reactions and comment updates

### **Technical Implementation**

#### **Workflow Structure**
```yaml
name: Manual PR Deploy
on:
  issue_comment:
    types: [created]
jobs:
  manual-pr-deploy:
    if: github.event.issue.pull_request && contains(github.event.comment.body, 'GitHub generate site')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write
      pull-requests: write
      issues: write
```

#### **Key Components**

1. **PR Context Resolution**:
   - Fetches PR details via GitHub API
   - Extracts head SHA and branch information
   - Validates PR is open and from authorized user

2. **Build Configuration**:
   - Dynamic `mkdocs.yml` modification for PR-specific `site_url`
   - Banner injection with requester and commit information
   - Asset path resolution for subdirectory deployment

3. **Deployment Strategy**:
   - Manual git operations instead of third-party actions
   - Direct branch manipulation on `gh-pages`
   - Atomic commits with descriptive messages

4. **Error Handling**:
   - Comprehensive logging throughout the process
   - Graceful failure with user-friendly error messages
   - Retry capability through re-commenting

#### **Banner Implementation**

The manual deploy banner is injected into the built site:

```html
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; text-align: center; font-weight: bold; border-radius: 8px; margin: 10px 0;">
  Manual PR Preview #${PR_NUMBER} | Requested by @${REQUESTER} | Built from ${COMMIT_SHA} | ${TIMESTAMP}
  <a href="${PR_URL}" style="color: #ffeb3b; margin-left: 10px;">View Original PR</a>
</div>
```

### **Configuration Requirements**

#### **Repository Settings**
```yaml
# Required permissions in repository settings
Actions permissions: "Read and write permissions"
Workflow permissions: "Allow GitHub Actions to create and approve pull requests"
Pages source: "Deploy from a branch"
Pages branch: "gh-pages"
Pages folder: "/ (root)"
```

#### **Environment Variables**
```yaml
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Auto-provided
PR_NUMBER: ${{ github.event.issue.number }}
REQUESTER: ${{ github.event.comment.user.login }}
COMMENT_ID: ${{ github.event.comment.id }}
```

### **Monitoring and Debugging**

#### **Workflow Logs**
- Build process logs available in Actions tab
- Error details captured and exposed to users
- Timing information for performance optimization

#### **Common Issues**

1. **Permission Errors**:
   - Check repository Actions permissions
   - Verify user has write access
   - Ensure GITHUB_TOKEN has required scopes

2. **Build Failures**:
   - MkDocs configuration errors
   - Missing dependencies in requirements.txt
   - Invalid markdown syntax in content files

3. **Deployment Issues**:
   - gh-pages branch doesn't exist (auto-created)
   - Git conflicts (resolved with force push strategy)
   - GitHub Pages propagation delays (5-10 minutes)

### **Extension Points**

#### **Custom Triggers**
Add additional trigger phrases by modifying the workflow condition:
```yaml
if: github.event.issue.pull_request && (
  contains(github.event.comment.body, 'GitHub generate site') ||
  contains(github.event.comment.body, 'build preview') ||
  contains(github.event.comment.body, 'deploy staging')
)
```

#### **Additional Notifications**
Integrate with external services:
```yaml
- name: Notify Slack
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: success
    text: "PR preview ready: ${{ steps.deploy.outputs.preview_url }}"
```

#### **Multi-Environment Support**
Extend for staging/production deployments:
```yaml
- name: Deploy to staging
  if: contains(github.event.comment.body, 'deploy staging')
  # staging deployment logic
```

### **Performance Considerations**

- **Build Time**: ~2-3 minutes for typical MkDocs site
- **Caching**: pip dependencies cached between runs
- **Cleanup**: Old previews cleaned up automatically on PR closure
- **Rate Limiting**: GitHub API calls are rate-limited per repository

### **Security Considerations**

- **User Authentication**: Only users with write access can trigger
- **Code Injection**: Comment content is sanitized before use
- **Branch Protection**: Manual deploy cannot modify protected branches
- **Token Scope**: GITHUB_TOKEN has minimal required permissions

---

**Ready to try it?** Comment "GitHub generate site" on any open PR! 