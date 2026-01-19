# Contributing Guide

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** (if you don't have write access)
2. **Clone your fork** (or the main repository if you have access)
3. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 20 or higher
- pnpm 9.0.0 or higher
- MongoDB (optional for local development - API runs without it)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers (both web and api)
pnpm dev
```

### Project Structure

- `apps/web` - React frontend application
- `apps/api` - Express backend API

See `.cursorrules` for detailed structure guidelines.

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
```

Branch naming conventions:
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Follow the project structure (see `.cursorrules`)
- Write self-documenting code
- Add proper TypeScript types
- Follow SOLID principles
- Ensure code passes linting and type checking

### 3. Test Your Changes

```bash
# Type check
cd apps/web && pnpm exec tsc --noEmit
cd apps/api && pnpm exec tsc --noEmit

# Lint
cd apps/web && pnpm lint
cd apps/api && pnpm exec eslint . --ext .ts

# Build
pnpm build
```

### 4. Commit Your Changes

Follow semantic commit conventions (see `COMMIT_CONVENTIONS.md`):

```bash
git commit -m "feat(web): add user profile page"
git commit -m "fix(api): resolve authentication token expiry"
```

### 5. Push and Create Pull Request

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request to the `main` branch on GitHub.

## Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass
2. ✅ Code passes TypeScript compilation
3. ✅ Code passes linting
4. ✅ No merge conflicts
5. ✅ Follows project structure and coding standards
6. ✅ Commit messages follow semantic commit format

### PR Requirements

- **Title**: Should follow semantic commit format
- **Description**: Clearly describe what changes were made and why
- **Validation**: PR must pass all GitHub Actions checks
- **Review**: At least one approval required (if branch protection is enabled)

### What Happens After Merge

When your PR is merged to `main`:
1. GitHub Actions will automatically:
   - Analyze commit messages
   - Determine version bump (major/minor/patch)
   - Generate release notes
   - Create git tag
   - Update package.json versions
   - Create GitHub release

## Code Standards

### TypeScript

- ✅ Use TypeScript strictly - no `any` types
- ✅ Use `import type` for type-only imports
- ✅ All components must have proper types
- ✅ DTOs should be classes with validation
- ✅ Types should be in `types/` folder

### React (Web Project)

- ✅ Follow Atomic Design structure
- ✅ Components in correct folders (atoms/molecules/organisms/templates/pages)
- ✅ Each component has `.types.ts` file
- ✅ Use functional components with hooks
- ✅ Extract reusable logic into custom hooks

### Express (API Project)

- ✅ Follow layered architecture (controllers → services → models)
- ✅ Use Zod for validation
- ✅ Use centralized error handling
- ✅ Use consistent response format
- ✅ All async handlers use `AsyncRequestHandler` type

### General

- ✅ Follow SOLID principles
- ✅ Write self-documenting code
- ✅ No unused code
- ✅ Consistent formatting
- ✅ Proper error handling

## Folder Structure

### Web Project

```
apps/web/src/
├── components/
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Simple component groups
│   ├── organisms/      # Complex UI sections
│   ├── templates/      # Page layout templates
│   └── pages/          # Full page components
├── hooks/              # Custom React hooks
├── dto/                # Data Transfer Objects
├── constants/          # Application constants
├── types/              # TypeScript types
├── services/           # API services
├── utils/              # Utility functions
├── config/             # Configuration
└── context/            # React contexts
```

### API Project

```
apps/api/src/
├── config/          # Environment, database, cron, swagger
├── controllers/     # HTTP request/response logic
├── services/        # Business logic
├── models/          # MongoDB schemas
├── routes/          # Route definitions
├── schemas/         # Zod validation schemas
├── types/           # TypeScript types
├── middleware/      # Express middleware
├── utils/           # Utility functions
└── constants/       # Application constants
```

## Commit Message Format

Follow semantic commit conventions:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

See `COMMIT_CONVENTIONS.md` for detailed guidelines.

## Branch Protection

The `main` branch is protected:
- ❌ Direct pushes are blocked
- ✅ All changes must go through Pull Requests
- ✅ PRs must pass all validation checks
- ✅ PRs require at least one approval
- ✅ Branches must be up to date before merging

## Getting Help

- Check existing documentation
- Review `.cursorrules` for coding standards
- Check `COMMIT_CONVENTIONS.md` for commit guidelines
- Open an issue for questions or problems

## Code Review Guidelines

When reviewing PRs:
- Check that code follows project structure
- Verify TypeScript types are correct
- Ensure code follows SOLID principles
- Check that commit messages follow conventions
- Verify all tests/checks pass
- Provide constructive feedback

Thank you for contributing! 🎉
