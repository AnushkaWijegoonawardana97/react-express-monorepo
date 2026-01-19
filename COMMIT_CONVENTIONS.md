# Semantic Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This ensures consistent commit history and enables automatic version bumping and release note generation.

## Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

## Commit Types

### Primary Types

- **feat**: A new feature
  - Example: `feat(auth): add JWT token refresh`
  - Version bump: **MINOR** (0.1.0 → 0.2.0)

- **fix**: A bug fix
  - Example: `fix(api): resolve database connection timeout`
  - Version bump: **PATCH** (0.1.0 → 0.1.1)

- **perf**: A performance improvement
  - Example: `perf(web): optimize bundle size`
  - Version bump: **MINOR** (0.1.0 → 0.2.0)

### Secondary Types

- **docs**: Documentation only changes
  - Example: `docs: update API documentation`
  - Version bump: None (unless it's a breaking change)

- **style**: Code style changes (formatting, missing semi-colons, etc.)
  - Example: `style(web): format code with prettier`
  - Version bump: None

- **refactor**: Code refactoring without feature changes or bug fixes
  - Example: `refactor(api): restructure service layer`
  - Version bump: None

- **test**: Adding or updating tests
  - Example: `test(auth): add unit tests for login service`
  - Version bump: None

- **chore**: Maintenance tasks, dependency updates
  - Example: `chore: update dependencies`
  - Version bump: None

- **ci**: CI/CD configuration changes
  - Example: `ci: add GitHub Actions workflow`
  - Version bump: None

- **build**: Build system or external dependencies
  - Example: `build: update webpack configuration`
  - Version bump: None

- **revert**: Reverts a previous commit
  - Example: `revert: revert "feat(auth): add OAuth"`

## Breaking Changes

To indicate a breaking change, add `!` after the type/scope or include `BREAKING CHANGE:` in the footer:

```
feat(api)!: change authentication middleware signature

BREAKING CHANGE: Auth middleware now requires additional parameters
```

Or:

```
feat!(api): change authentication middleware signature
```

- Version bump: **MAJOR** (0.1.0 → 1.0.0)

## Scope

The scope is optional and indicates the area of the codebase affected:

- **web**: Frontend/web application changes
- **api**: Backend/API changes
- **auth**: Authentication related
- **config**: Configuration changes
- **deps**: Dependency updates
- Or any other relevant scope

## Examples

### Good Commit Messages

```
feat(web): add user dashboard page
fix(api): resolve CORS error in production
perf(web): optimize image loading
docs: update README with setup instructions
refactor(api): extract database connection logic
test(web): add tests for Button component
chore: update pnpm to latest version
ci: add PR validation workflow
```

### Breaking Changes

```
feat(api)!: change user model structure

BREAKING CHANGE: User model now requires email verification field

feat!(web): update routing structure

BREAKING CHANGE: Route paths have been restructured
```

## Version Bumping Rules

The release workflow automatically determines version bumps based on commit messages:

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes (`!` or `BREAKING CHANGE:`)
- **MINOR** (1.0.0 → 1.1.0): New features (`feat`), performance improvements (`perf`)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (`fix`)

## Best Practices

1. **Use imperative mood**: "add" not "added" or "adds"
2. **Keep it concise**: First line should be 50 characters or less
3. **Be specific**: Clearly describe what changed
4. **Use scope**: Help categorize changes
5. **Reference issues**: Add `Closes #123` in footer if applicable

## Examples with Issues

```
feat(web): add dark mode toggle

Closes #45

fix(api): resolve memory leak in user service

Fixes #78
```

## Commit Message Validation

The PR validation workflow checks that commits follow this convention. Commits that don't follow the format will cause the PR to fail validation.

## Tools

You can use commitizen to help write conventional commits:

```bash
pnpm add -D commitizen cz-conventional-changelog
```

Then configure in `package.json`:
```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```
