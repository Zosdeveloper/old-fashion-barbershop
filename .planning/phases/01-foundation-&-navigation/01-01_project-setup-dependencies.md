---
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.mjs
  - tailwind.config.ts
  - postcss.config.mjs
  - src/app/globals.css
  - src/lib/utils.ts
  - .env.local
  - .env.example
  - .gitignore
autonomous: true
---

# Plan 01-01: Project Setup & Dependencies

## Objective
Create the Next.js 14 project from scratch (no create-next-app) with all configuration files, install dependencies, and verify the dev server boots cleanly. This establishes the foundation every other plan depends on.

## must_haves
- All config files exist and are syntactically valid
- `npm install` completes without errors
- `npm run dev` starts the Next.js dev server without crashes
- TypeScript compilation passes with no errors
- Tailwind CSS processes directives in globals.css
- Environment variable NEXT_PUBLIC_BOOKSY_URL is defined in .env.local

## Tasks

<task id="1">
Create `C:\Users\Administrator\old-fashion-barbershop\package.json` with the following exact contents:

```json
{
  "name": "old-fashion-barbershop",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^12.33.0",
    "lenis": "^1.1.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```
</task>

<task id="2">
Create `C:\Users\Administrator\old-fashion-barbershop\tsconfig.json` with the following exact contents:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
</task>

<task id="3">
Create `C:\Users\Administrator\old-fashion-barbershop\next.config.mjs` with the following exact contents:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```
</task>

<task id="4">
Create `C:\Users\Administrator\old-fashion-barbershop\tailwind.config.ts` with the following exact contents. This is a minimal starter config — Plan 01-02 will extend it with the full design system.

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```
</task>

<task id="5">
Create `C:\Users\Administrator\old-fashion-barbershop\postcss.config.mjs` with the following exact contents:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```
</task>

<task id="6">
Create the `src/app/` directory and add a minimal `globals.css` at `C:\Users\Administrator\old-fashion-barbershop\src\app\globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
</task>

<task id="7">
Create a minimal root layout at `C:\Users\Administrator\old-fashion-barbershop\src\app\layout.tsx` so the dev server can boot:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Old Fashion Barbershop",
  description: "Premium barbershop experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
</task>

<task id="8">
Create a minimal home page at `C:\Users\Administrator\old-fashion-barbershop\src\app\page.tsx` so the dev server has something to render:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Old Fashion Barbershop</h1>
      <p>Site under construction.</p>
    </main>
  );
}
```
</task>

<task id="9">
Create `C:\Users\Administrator\old-fashion-barbershop\src\lib\utils.ts` with the cn() utility:

```ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```
</task>

<task id="10">
Create `C:\Users\Administrator\old-fashion-barbershop\.env.local` with:

```
NEXT_PUBLIC_BOOKSY_URL=https://booksy.com/en-us/dl/placeholder
```

Create `C:\Users\Administrator\old-fashion-barbershop\.env.example` with:

```
NEXT_PUBLIC_BOOKSY_URL=https://booksy.com/en-us/dl/your-shop-id
```
</task>

<task id="11">
Create `C:\Users\Administrator\old-fashion-barbershop\.gitignore` with:

```
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```
</task>

<task id="12">
Run `npm install` to install all dependencies. Use:

```bash
npm install --prefix "C:/Users/Administrator/old-fashion-barbershop"
```

Wait for installation to complete. Verify no errors in the output.
</task>

<task id="13">
Verify the dev server starts cleanly. Run:

```bash
cd "C:/Users/Administrator/old-fashion-barbershop" && npx next build
```

The build should complete without TypeScript or config errors. (We use `next build` for verification since `next dev` runs indefinitely.)
</task>

## Verification
- [ ] `package.json` exists with all listed dependencies
- [ ] `node_modules/` directory exists after npm install
- [ ] `tsconfig.json` has path alias `@/*` pointing to `./src/*`
- [ ] `tailwind.config.ts` exists and is valid TypeScript
- [ ] `postcss.config.mjs` exists with tailwindcss and autoprefixer plugins
- [ ] `src/app/globals.css` contains Tailwind directives
- [ ] `src/app/layout.tsx` and `src/app/page.tsx` exist
- [ ] `src/lib/utils.ts` exports a `cn` function
- [ ] `.env.local` contains NEXT_PUBLIC_BOOKSY_URL
- [ ] `.env.example` contains NEXT_PUBLIC_BOOKSY_URL template
- [ ] `.gitignore` excludes node_modules, .next, and .env*.local
- [ ] `next build` completes without errors
