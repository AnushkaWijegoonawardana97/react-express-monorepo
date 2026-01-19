# React Express Monorepo

A modern full-stack monorepo application built with React, Express, TypeScript, and MongoDB. This project follows best practices including Atomic Design principles, SOLID principles, and semantic versioning.

## Tech Stack

### Frontend (Web)
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TanStack Query** - Data fetching and caching

### Backend (API)
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database (optional - API runs without it)
- **Mongoose** - MongoDB ODM
- **Zod** - Schema validation
- **JWT** - Authentication
- **Swagger** - API documentation

### Development Tools
- **pnpm** - Package manager
- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **TypeScript** - Type checking

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20 or higher (enforced via package.json engines)
- **pnpm** 9.0.0 (exact version required - enforced via packageManager)
- **MongoDB** (optional - API can run in demo mode without database)
- **Git**

### Installing pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-express-monorepo
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for both the web and API projects.

### 3. Environment Setup

#### Web Project Environment Variables

Create a `.env` file in `apps/web/`:

```bash
cd apps/web
cp .env.example .env
```

Edit `apps/web/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

#### API Project Environment Variables

Create a `.env` file in `apps/api/`:

```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=24h
CORS_ORIGIN=http://localhost:5173
```

**Note:** The API can run without MongoDB. If you don't provide a valid `MONGODB_URI`, the API will start in demo mode and log a warning. This is useful for boilerplate setup and development.

### 4. Run the Project

From the root directory:

```bash
pnpm dev
```

This will start both the web and API servers simultaneously using Turbo.

## Running the Project

### Development Mode

Run both projects in development mode:

```bash
pnpm dev
```

This command:
- Starts the **Web** application on `http://localhost:5173`
- Starts the **API** server on `http://localhost:3000`
- Enables hot module replacement (HMR) for both projects

### Individual Project Commands

#### Web Project

```bash
# Navigate to web project
cd apps/web

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

#### API Project

```bash
# Navigate to API project
cd apps/api

# Development server (with hot reload)
pnpm dev

# Build TypeScript
pnpm build

# Start production server
pnpm start
```

### Build for Production

Build both projects:

```bash
pnpm build
```

### Access Points

Once running, you can access:

- **Web Application**: http://localhost:5173
- **API Server**: http://localhost:3000
- **API Documentation (Swagger)**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **API Root**: http://localhost:3000/

## Environment Variables

### Web Project (`apps/web/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for API requests | `http://localhost:3000/api` |

**Note:** All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

### API Project (`apps/api/.env`)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | Server port | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | - | **No** (optional) |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes |
| `JWT_EXPIRY` | JWT token expiration time | `24h` | No |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` | No |

**Important Notes:**

1. **MongoDB is Optional**: The API is designed to run without a database connection. If `MONGODB_URI` is invalid or missing, the API will start in demo mode.
2. **JWT_SECRET**: Must be set in production. Use a strong, random string.
3. **CORS_ORIGIN**: Should match your frontend URL in production.

## Project Structure

### Monorepo Overview

```
react-express-monorepo/
├── apps/
│   ├── web/          # React frontend application
│   └── api/          # Express backend API
├── .github/          # GitHub Actions workflows
├── node_modules/     # Root dependencies
├── package.json      # Root package.json
├── pnpm-workspace.yaml  # pnpm workspace configuration
├── turbo.json        # Turbo build configuration
└── README.md         # This file
```

### Web Project Structure (`apps/web/src/`)

The web project follows **Atomic Design** principles for component organization.

```
apps/web/src/
├── components/       # React components (Atomic Design)
│   ├── atoms/        # Basic building blocks
│   ├── molecules/    # Simple component groups
│   ├── organisms/    # Complex UI sections
│   ├── templates/    # Page layout templates
│   └── pages/        # Full page components
├── hooks/            # Custom React hooks
├── dto/              # Data Transfer Objects
├── constants/        # Application constants
├── types/            # TypeScript type definitions
├── services/         # API service functions
├── utils/            # Utility functions
├── config/           # Configuration files
└── context/          # React contexts
```

#### Components Folder - Atomic Design

The `components/` folder is organized using Atomic Design methodology:

##### 1. Atoms (`components/atoms/`)

**Purpose:** Basic building blocks that cannot be broken down further.

**Examples:** Button, Input, Label, Icon, Spinner

**Characteristics:**
- Highly reusable
- Minimal dependencies
- No business logic
- Each component in its own folder: `Button/Button.tsx` and `Button/Button.types.ts`

**Example Structure:**
```
components/atoms/
└── Button/
    ├── Button.tsx
    └── Button.types.ts
```

**Usage:**
```tsx
import { Button } from '@/components/atoms/Button/Button';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

##### 2. Molecules (`components/molecules/`)

**Purpose:** Simple combinations of atoms that form a functional unit.

**Examples:** Card, FormField, SearchBar, NavigationItem

**Characteristics:**
- Combines multiple atoms
- Has a specific function
- Still reusable but more context-specific

**Example Structure:**
```
components/molecules/
└── FormField/
    ├── FormField.tsx
    └── FormField.types.ts
```

**Usage:**
```tsx
import { FormField } from '@/components/molecules/FormField/FormField';

<FormField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={errors.email}
/>
```

##### 3. Organisms (`components/organisms/`)

**Purpose:** Complex UI sections that combine molecules and atoms.

**Examples:** Header, Navigation, Footer, Sidebar, ProductCard

**Characteristics:**
- Combines molecules and atoms
- Represents a distinct section of the interface
- May contain business logic
- Less reusable, more context-specific

**Example Structure:**
```
components/organisms/
└── Header/
    ├── Header.tsx
    └── Header.types.ts
```

**Usage:**
```tsx
import { Header } from '@/components/organisms/Header/Header';

<Header user={user} onLogout={handleLogout} />
```

##### 4. Templates (`components/templates/`)

**Purpose:** Page layout structures that define the overall page structure.

**Examples:** PublicLayout, PrivateLayout, DashboardLayout

**Characteristics:**
- Defines page structure
- Uses organisms, molecules, and atoms
- Provides layout slots for content
- No actual content, just structure

**Example Structure:**
```
components/templates/
└── PrivateLayout/
    └── PrivateLayout.tsx
```

**Usage:**
```tsx
import { PrivateLayout } from '@/components/templates/PrivateLayout/PrivateLayout';

<PrivateLayout>
  <DashboardContent />
</PrivateLayout>
```

##### 5. Pages (`components/pages/`)

**Purpose:** Full page components that use templates and compose all lower-level components.

**Examples:** HomePage, LoginPage, DashboardPage, ProfilePage

**Characteristics:**
- Complete page implementations
- Uses templates for layout
- Composes organisms, molecules, and atoms
- Contains page-specific logic

**Example Structure:**
```
components/pages/
└── DashboardPage/
    └── DashboardPage.tsx
```

**Usage:**
```tsx
import { DashboardPage } from '@/components/pages/DashboardPage/DashboardPage';

// Used in routing
<Route path="/dashboard" element={<DashboardPage />} />
```

#### Other Folders

##### Hooks (`hooks/`)

**Purpose:** Custom React hooks for reusable logic.

**Examples:** `useAuth.ts`, `useApi.ts`, `useLocalStorage.ts`

**Usage:**
```tsx
import { useAuth } from '@/hooks/useAuth';

const { user, login, logout } = useAuth();
```

##### DTO (`dto/`)

**Purpose:** Data Transfer Objects - classes with validation and transformation methods.

**Examples:** `LoginRequestDto`, `RegisterRequestDto`, `UserDto`

**Characteristics:**
- Classes (not interfaces)
- Include validation methods
- Transform data between API and application
- Type-safe data handling

**Usage:**
```tsx
import { LoginRequestDto } from '@/dto/auth.dto';

const dto = new LoginRequestDto({ email, password });
if (dto.validate()) {
  const data = dto.toJSON();
  // Send to API
}
```

##### Constants (`constants/`)

**Purpose:** Application-wide constants and configuration values.

**Examples:** `api.ts` (API endpoints), `routes.ts` (route paths)

**Usage:**
```tsx
import { API_ENDPOINTS } from '@/constants/api';

fetch(API_ENDPOINTS.AUTH.LOGIN, { ... });
```

##### Types (`types/`)

**Purpose:** TypeScript type definitions (interfaces and type aliases).

**Examples:** `index.ts`, `auth.types.ts`, `user.types.ts`

**Usage:**
```tsx
import type { User, ApiResponse } from '@/types';

const user: User = { ... };
```

##### Services (`services/`)

**Purpose:** API service functions that handle HTTP requests.

**Examples:** `authService.ts`, `userService.ts`

**Characteristics:**
- Uses Axios instance from `config/axios.ts`
- Handles API communication
- Returns typed responses

**Usage:**
```tsx
import { login } from '@/services/authService';

const response = await login({ email, password });
```

##### Utils (`utils/`)

**Purpose:** Utility functions and helpers.

**Examples:** Formatters, validators, helpers

**Usage:**
```tsx
import { formatDate, validateEmail } from '@/utils';
```

##### Config (`config/`)

**Purpose:** Configuration files for external libraries and services.

**Examples:** `axios.ts` (Axios instance with interceptors)

**Usage:**
```tsx
import { apiClient } from '@/config/axios';

apiClient.get('/users');
```

##### Context (`context/`)

**Purpose:** React Context providers for global state management.

**Examples:** `AuthContext.tsx`, `ThemeContext.tsx`

**Usage:**
```tsx
import { AuthProvider } from '@/context/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>
```

### API Project Structure (`apps/api/src/`)

The API project follows a **layered architecture** pattern.

```
apps/api/src/
├── config/          # Configuration files
├── controllers/     # HTTP request/response logic
├── services/        # Business logic
├── models/          # MongoDB schemas
├── routes/          # Route definitions
├── schemas/         # Zod validation schemas
├── types/           # TypeScript type definitions
├── middleware/      # Express middleware
├── utils/           # Utility functions
└── constants/       # Application constants
```

#### Config (`config/`)

**Purpose:** Configuration and setup files.

**Files:**
- **`env.ts`** - Environment variable validation using Zod
- **`database.ts`** - MongoDB connection (optional)
- **`swagger.ts`** - Swagger/OpenAPI documentation setup
- **`cron.ts`** - Scheduled tasks and cron jobs

**Usage:**
```tsx
import config from './config/env';
import { connectDatabase } from './config/database';
```

#### Controllers (`controllers/`)

**Purpose:** Handle HTTP requests and responses. Thin layer that delegates to services.

**Examples:** `auth.controller.ts`, `user.controller.ts`

**Characteristics:**
- Extract data from requests
- Call service methods
- Return responses
- Handle errors by calling `next(error)`
- Use `AsyncRequestHandler` type for async handlers

**Example:**
```tsx
export const login: AsyncRequestHandler = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    sendSuccess(res, result, 200);
  } catch (error) {
    next(error);
  }
};
```

#### Services (`services/`)

**Purpose:** Contain business logic and data transformations.

**Examples:** `auth.service.ts`, `user.service.ts`

**Characteristics:**
- Core application logic
- Interact with models
- Perform data transformations
- Handle business rules
- No HTTP-specific code

**Example:**
```tsx
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const user = await UserModel.findOne({ email: credentials.email });
  // Business logic here
  return { user, token };
};
```

#### Models (`models/`)

**Purpose:** MongoDB schemas using Mongoose.

**Examples:** `User.model.ts`, `Product.model.ts`

**Characteristics:**
- Define data structure
- Include schema-level validation
- Define relationships
- Use Mongoose schemas

**Example:**
```tsx
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

#### Routes (`routes/`)

**Purpose:** Express route definitions and organization.

**Examples:** `auth.routes.ts`, `user.routes.ts`, `index.ts`

**Characteristics:**
- Define API endpoints
- Connect routes to controllers
- Apply middleware
- Organize routes by feature

**Example:**
```tsx
router.post('/login', validateRequest(loginSchema), authController.login);
```

#### Schemas (`schemas/`)

**Purpose:** Zod validation schemas for request/response validation.

**Examples:** `auth.schema.ts`, `user.schema.ts`

**Characteristics:**
- Validate request data
- Validate response data
- Used by validation middleware
- Type-safe validation

**Example:**
```tsx
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

#### Types (`types/`)

**Purpose:** TypeScript type definitions for the API.

**Examples:** `auth.types.ts`, `user.types.ts`, `index.ts`

**Usage:**
```tsx
import type { LoginRequest, AuthResponse } from './types';
```

#### Middleware (`middleware/`)

**Purpose:** Express middleware functions.

**Examples:** `auth.middleware.ts`, `error.middleware.ts`, `validation.middleware.ts`

**Characteristics:**
- Authentication/authorization
- Error handling
- Request validation
- Reusable and composable

**Usage:**
```tsx
router.get('/profile', authenticate, userController.getProfile);
```

#### Utils (`utils/`)

**Purpose:** Utility functions and helpers.

**Examples:** `jwt.util.ts`, `bcrypt.util.ts`, `response.util.ts`

**Usage:**
```tsx
import { generateToken } from './utils/jwt.util';
import { hashPassword } from './utils/bcrypt.util';
```

#### Constants (`constants/`)

**Purpose:** Application-wide constants.

**Examples:** `messages.ts`, `index.ts`

**Usage:**
```tsx
import { ERROR_MESSAGES } from './constants';
```

## Development Guidelines

### Atomic Design Principles

The web project follows Atomic Design methodology for component organization:

1. **Atoms** → Basic building blocks (Button, Input)
2. **Molecules** → Simple groups (FormField = Label + Input)
3. **Organisms** → Complex sections (Header = Logo + Navigation + UserMenu)
4. **Templates** → Page layouts (PublicLayout, PrivateLayout)
5. **Pages** → Full pages (HomePage, DashboardPage)

**Rules:**
- Atoms should not import molecules or organisms
- Molecules can import atoms
- Organisms can import molecules and atoms
- Templates compose organisms
- Pages use templates and compose all levels

### Coding Standards

#### TypeScript

- ✅ Use TypeScript strictly - avoid `any` types
- ✅ Use `import type` for type-only imports
- ✅ All components must have proper TypeScript types
- ✅ DTOs should be classes with validation methods
- ✅ Types should be interfaces or type aliases

#### SOLID Principles

1. **Single Responsibility** - Each class/function has one reason to change
2. **Open/Closed** - Open for extension, closed for modification
3. **Liskov Substitution** - Derived classes must be substitutable
4. **Interface Segregation** - Clients shouldn't depend on unused interfaces
5. **Dependency Inversion** - Depend on abstractions, not concretions

#### File Naming

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types: camelCase with `.types.ts` suffix (`Button.types.ts`)
- Constants: UPPER_SNAKE_CASE for values, camelCase for files

#### Import Order

1. External dependencies (React, libraries)
2. Internal absolute imports (from `@/`)
3. Relative imports (`./`, `../`)
4. Type imports (use `import type`)

## Semantic Git Commit Versioning

This project uses **semantic commit messages** to enable automatic version bumping and release note generation.

### Commit Format

```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | **MINOR** (0.1.0 → 0.2.0) |
| `fix` | Bug fix | **PATCH** (0.1.0 → 0.1.1) |
| `perf` | Performance improvement | **MINOR** (0.1.0 → 0.2.0) |
| `docs` | Documentation changes | None |
| `style` | Code style changes | None |
| `refactor` | Code refactoring | None |
| `test` | Adding tests | None |
| `chore` | Maintenance tasks | None |
| `ci` | CI/CD changes | None |
| `build` | Build system changes | None |
| `revert` | Revert previous commit | None |

### Breaking Changes

To indicate a breaking change, add `!` after the type/scope:

```
feat(api)!: change authentication middleware signature

BREAKING CHANGE: Auth middleware now requires additional parameters
```

Breaking changes trigger a **MAJOR** version bump (1.0.0 → 2.0.0).

### Examples

```bash
# New feature
git commit -m "feat(web): add user dashboard page"

# Bug fix
git commit -m "fix(api): resolve CORS error in production"

# Breaking change
git commit -m "feat(api)!: change user model structure"

# Documentation
git commit -m "docs: update README with setup instructions"
```

### Automatic Release Process

When code is merged to the `main` branch:

1. **GitHub Actions** analyzes commit messages
2. **Version bump** is determined (major/minor/patch)
3. **Release notes** are generated from commit messages
4. **Git tag** is created (e.g., `v1.2.3`)
5. **package.json** versions are updated (root, web, api)
6. **GitHub release** is created with notes

**No manual versioning required!** Just follow the commit message format.

For detailed guidelines, see [COMMIT_CONVENTIONS.md](./COMMIT_CONVENTIONS.md).

## Additional Resources

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines and development workflow
- **[COMMIT_CONVENTIONS.md](./COMMIT_CONVENTIONS.md)** - Detailed semantic commit guidelines
- **[.cursorrules](./.cursorrules)** - Cursor AI coding standards and structure rules
- **[.github/BRANCH_PROTECTION.md](./.github/BRANCH_PROTECTION.md)** - Branch protection setup guide

## Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

**Web (port 5173):**
```bash
# Find process using port 5173
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Kill the process or change port in vite.config.ts
```

**API (port 3000):**
```bash
# Change PORT in apps/api/.env
PORT=3001
```

### Environment Variables Not Loading

**Web Project:**
- Ensure variables are prefixed with `VITE_`
- Restart the dev server after changing `.env`
- Check that `.env` is in `apps/web/` directory

**API Project:**
- Ensure `.env` is in `apps/api/` directory
- Restart the server after changing `.env`
- Check for validation errors in `config/env.ts`

### MongoDB Connection Issues

The API is designed to run **without MongoDB**. If you see connection warnings:

- **Option 1:** Ignore the warning - API runs in demo mode
- **Option 2:** Install and start MongoDB locally
- **Option 3:** Use MongoDB Atlas (cloud) and update `MONGODB_URI`

### TypeScript Errors

```bash
# Check TypeScript compilation
cd apps/web && pnpm exec tsc --noEmit
cd apps/api && pnpm exec tsc --noEmit
```

### Build Errors

```bash
# Clean and rebuild
rm -rf node_modules apps/*/node_modules
pnpm install
pnpm build
```

### Linting Errors

```bash
# Fix linting issues
cd apps/web && pnpm lint --fix
```

## License

[Add your license here]

## Support

For questions or issues, please open an issue on GitHub.

---

**Happy Coding! 🚀**
