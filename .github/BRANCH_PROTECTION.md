# Branch Protection Setup Guide

This document outlines how to configure branch protection for the `main` branch in GitHub to enforce code quality and prevent direct pushes.

## Required Branch Protection Settings

To protect the `main` branch, follow these steps:

### 1. Navigate to Branch Protection Settings

1. Go to your repository on GitHub
2. Click on **Settings**
3. Click on **Branches** in the left sidebar
4. Under **Branch protection rules**, click **Add rule** or edit existing rule for `main`

### 2. Configure Protection Rules

#### Basic Settings

- **Branch name pattern**: `main`
- **Protect matching branches**: ✅ Enabled

#### Required Settings

1. **Require a pull request before merging**
   - ✅ Require approvals: **1** (or more as needed)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (if you have a CODEOWNERS file)

2. **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - ✅ Require status checks to pass before merging
   - Select the following required status checks:
     - `PR Validation / validate`
     - `CI / ci`

3. **Require conversation resolution before merging**
   - ✅ Enabled (recommended)

4. **Require signed commits**
   - ⚠️ Optional but recommended for security

5. **Require linear history**
   - ✅ Enabled (prevents merge commits, enforces rebase/squash)

6. **Require merge queue**
   - ⚠️ Optional (GitHub Pro/Team feature)

#### Restrictions

1. **Restrict who can push to matching branches**
   - ✅ Enabled
   - Add teams/users who should have direct push access (usually only admins)

2. **Allow force pushes**
   - ❌ **Disabled** (critical for protection)

3. **Allow deletions**
   - ❌ **Disabled** (critical for protection)

### 3. Save Settings

Click **Create** or **Save changes** to apply the protection rules.

## How It Works

Once configured:

- ✅ **Direct pushes to `main` are blocked** - All changes must go through PRs
- ✅ **PRs must pass all validation checks** - TypeScript, builds, linting must pass
- ✅ **PRs require at least one approval** - Code review is mandatory
- ✅ **Branches must be up to date** - Prevents merge conflicts
- ✅ **Force pushes are blocked** - Prevents history rewriting

## Workflow

1. Developer creates a feature branch from `main`
2. Developer makes changes and commits (following semantic commit conventions)
3. Developer opens a Pull Request to `main`
4. GitHub Actions runs PR validation workflow
5. If validation passes, PR can be reviewed
6. After approval and all checks pass, PR can be merged
7. On merge to `main`, release workflow automatically creates a new release

## Troubleshooting

### "Required status check is missing"
- Ensure the GitHub Actions workflows are running successfully
- Check that workflow files are in `.github/workflows/`
- Verify workflow names match the required status checks

### "Branch is out of date"
- Update your branch: `git pull origin main` or use GitHub's "Update branch" button

### "Merging is blocked"
- Ensure all required status checks have passed
- Ensure PR has required number of approvals
- Ensure there are no merge conflicts
