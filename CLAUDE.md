# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KPI Trade is a Next.js 15 web application for a student marketplace, built with React 19, TypeScript, and Tailwind CSS. The app enables users to browse, filter, and create product listings with authentication and image upload capabilities.

## Development Commands

### Running the Application
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm test` - Run all Jest tests
- `npm test -- path/to/test.test.ts` - Run a single test file

## Architecture

### Directory Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # React components
│   ├── ui/          # Reusable UI primitives (Radix UI-based)
│   ├── products/    # Product-specific components
│   ├── categories/  # Category-specific components
│   └── layout/      # Layout components
├── services/api/    # API service layer
│   ├── auth/        # Authentication API functions
│   ├── products/    # Products API functions
│   └── categories/  # Categories API functions
├── hooks/           # Custom React hooks
│   ├── products/    # Product-related hooks
│   ├── categories/  # Category-related hooks
│   └── utils/       # Utility hooks
├── contexts/        # React contexts (AuthContext)
├── store/           # Zustand stores (useProductFilters)
├── schemas/         # Zod validation schemas
├── types/           # TypeScript type definitions
├── lib/             # Core utilities (api client, query client)
└── utils/           # Helper functions
```

### Key Architecture Patterns

#### API Layer (`src/services/api/`)
- All API calls go through a centralized Axios instance (`src/lib/api.ts`)
- Base URL configured via `NEXT_PUBLIC_API_URL` environment variable
- Each domain has its own API module (auth, products, categories)
- Response validation using Zod schemas in `responses.ts` files
- API functions are pure and return parsed/validated data

#### Authentication (`src/contexts/auth-context.tsx`)
- JWT-based authentication with access tokens
- Automatic token refresh on 401 responses via Axios interceptors
- AuthContext provides: `user`, `isAuthenticated`, `login`, `register`, `logout`, `isLoading`
- Access tokens automatically injected into request headers
- Refresh token logic prevents concurrent refresh requests with promise deduplication

#### Data Fetching (`src/hooks/`)
- TanStack Query (React Query) for server state management
- Custom hooks wrap API calls with `useQuery` (e.g., `useProducts`, `useCategories`)
- Query client configured in `src/lib/query-client.ts` with 60s stale time
- Separate client instances for server/browser (Next.js App Router compatibility)

#### State Management
- **Server state**: TanStack Query (products, categories, user data)
- **Client state**: Zustand stores (e.g., `useProductFilters` for filter state)
- React Context for auth state that needs to be globally accessible

#### Form Handling
- React Hook Form with Zod resolvers (`@hookform/resolvers/zod`)
- Schemas defined in `src/schemas/` (e.g., `createProductFormSchema.ts`)
- Error messages in Ukrainian

#### Image Uploads
- UploadThing integration for file uploads
- Custom API route at `/api/uploadthing/route.ts`
- Requires `UPLOADTHING_TOKEN` environment variable
- Returns URL and key for uploaded images

### Component Organization

- **UI components** (`src/components/ui/`): Radix UI primitives with Tailwind styling (Button, Input, Dialog, etc.)
- **Domain components**: Grouped by feature (products, categories, layout)
- Use `@/` path alias for imports (configured in `tsconfig.json`)

### Styling
- Tailwind CSS v4 with custom configuration
- Utility classes with `clsx` and `tailwind-merge` (via `src/lib/utils.ts`)
- Class variance authority (`cva`) for component variants
- Lucide React for icons

## Testing

- Jest with React Testing Library
- Test files colocated with source: `*.test.ts` or `*.test.tsx`
- Module name mapper for `@/` alias configured in `jest.config.ts`
- Node environment by default (can be overridden per-file)

## Important Notes

### API Integration
- Backend API base URL: `https://kpitrade.uaproject.xyz/api` (configurable via env)
- All API responses are validated with Zod schemas before use
- Token refresh is handled automatically; avoid manual token management

### Next.js App Router
- Using Next.js 15 with App Router (not Pages Router)
- Server/Client components: Be mindful of `"use client"` directive
- Query client pattern ensures separate instances for server/client rendering

### Path Aliases
- Always use `@/` for imports from `src/` directory
- Example: `import { api } from "@/lib/api"`

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API base URL (required)
- `UPLOADTHING_TOKEN` - UploadThing API token for image uploads (required)
