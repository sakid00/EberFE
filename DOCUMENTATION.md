# EBER Frontend — Project Documentation

> This document provides a comprehensive overview of the EBER corporate website frontend. It is intended for developers who are new to the project and need to understand how pages, components, hooks, and data flow work together.

---

## Table of Contents

- [EBER Frontend — Project Documentation](#eber-frontend--project-documentation)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
    - [Key conventions](#key-conventions)
  - [Architecture Overview](#architecture-overview)
  - [Routing](#routing)
  - [Global Providers \& Context](#global-providers--context)
    - [1. `DataProvider` — Central Data Store](#1-dataprovider--central-data-store)
    - [2. `TranslationContext` — i18n](#2-translationcontext--i18n)
    - [3. `NavigationContext` — Navigation State](#3-navigationcontext--navigation-state)
  - [Root Layout](#root-layout)
  - [Pages — Detailed Breakdown](#pages--detailed-breakdown)
    - [Home `/`](#home-)
    - [About Us `/about-us`](#about-us-about-us)
    - [Products `/product`](#products-product)
    - [Custom Product `/product/submit`](#custom-product-productsubmit)
    - [Corporate `/corporate`](#corporate-corporate)
    - [Activity `/activity`](#activity-activity)
    - [Activity Detail `/activity/[id]`](#activity-detail-activityid)
    - [Careers `/careers`](#careers-careers)
    - [Submit Application `/careers/submit`](#submit-application-careerssubmit)
    - [Contact Us `/contact-us`](#contact-us-contact-us)
    - [404 Not Found](#404-not-found)
  - [Custom Hooks](#custom-hooks)
    - [Data-Fetching Hooks](#data-fetching-hooks)
      - [`useApi` — Base HTTP Client](#useapi--base-http-client)
      - [`useProduct`](#useproduct)
      - [`useActivity`](#useactivity)
      - [`useCompany`](#usecompany)
      - [`useCareer`](#usecareer)
      - [`useCertificate`](#usecertificate)
      - [`useTopProducts`](#usetopproducts)
      - [`useContactForm`](#usecontactform)
    - [UI / Utility Hooks](#ui--utility-hooks)
      - [`useDeviceType`](#usedevicetype)
      - [`useTranslation`](#usetranslation)
      - [`useScrollAnimation`](#usescrollanimation)
      - [`useAssetLoading` / `useDevAssetLoading`](#useassetloading--usedevassetloading)
      - [`useNavigationCache`](#usenavigationcache)
      - [`usePrefetchNavigation`](#useprefetchnavigation)
  - [Shared Components](#shared-components)
    - [Layout Components](#layout-components)
    - [Card Components](#card-components)
    - [Form Components](#form-components)
    - [Text Components](#text-components)
    - [Image Components](#image-components)
    - [Navigation Components](#navigation-components)
    - [Skeleton / Loading Components](#skeleton--loading-components)
    - [Other Components](#other-components)
  - [API Endpoints Summary](#api-endpoints-summary)
    - [GET Endpoints](#get-endpoints)
    - [POST Endpoints](#post-endpoints)
  - [State Management Pattern](#state-management-pattern)
    - [Flow diagram](#flow-diagram)
    - [Why this pattern?](#why-this-pattern)
  - [Translation / i18n](#translation--i18n)
    - [How it works](#how-it-works)
    - [Adding translations](#adding-translations)
  - [Performance Optimizations](#performance-optimizations)

---

## Tech Stack

| Layer              | Technology                 |
| ------------------ | -------------------------- |
| Framework          | Next.js 16 (App Router)    |
| Language           | TypeScript 5               |
| UI Library         | React 19                   |
| Component Library  | Material UI (MUI) v6       |
| CSS                | Emotion + Tailwind CSS v4  |
| Animations         | Motion (Framer Motion) v12 |
| Particles          | tsparticles                |
| PDF                | react-pdf + react-pageflip |
| Monitoring         | Sentry (@sentry/nextjs)    |
| Sanitization       | isomorphic-dompurify       |
| Image Optimization | sharp (AVIF / WebP)        |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router — pages & layouts
│   ├── layout.tsx              # Root layout (providers, header, footer)
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # 404 page
│   ├── global-error.tsx        # Global error boundary
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── globals.css             # Global styles
│   ├── about-us/               # About Us route
│   ├── activity/               # Activity listing + [id] detail
│   ├── careers/                # Careers listing + submit application
│   ├── contact-us/             # Contact form
│   ├── corporate/              # Corporate / subsidiary pages
│   └── product/                # Product catalog + custom product form
│
├── components/                 # Reusable, generic UI components
│   ├── header/                 # Site header / navigation bar
│   ├── footer/                 # Site footer
│   ├── Cards/                  # Card variants (TopProducts, Value, Activity, etc.)
│   ├── FormBox/                # Reusable form component
│   ├── PDFViewer/              # Flipbook-style PDF viewer modal
│   ├── Skeleton/               # Loading skeleton variants
│   ├── BackgroundParticles/    # Animated particle background
│   ├── LoadingWrapper/         # Asset-loading screen wrapper
│   ├── PrefetchWrapper/        # Route prefetch wrapper
│   └── ...                     # DualColorText, TextParser, ImageWithLoading, etc.
│
├── containers/                 # Page-level container/section components
│   ├── home/                   # Home page sections
│   ├── about-us/               # About Us sections
│   ├── product/                # Product page sections
│   ├── activity/               # Activity pages
│   ├── career/                 # Career page sections
│   ├── corporate/              # Corporate page sections
│   ├── formSubmit/             # Shared form-submission layout
│   └── not-found/              # 404 UI
│
├── contexts/                   # React Context providers
│   ├── DataProvider.tsx        # Central data store (useReducer)
│   ├── TranslationContext.tsx  # i18n language & translations
│   └── NavigationContext.tsx   # Navigation state tracking
│
├── hooks/                      # Custom React hooks
│   ├── useApi.ts               # Base HTTP client
│   ├── useProduct.ts           # Product data operations
│   ├── useActivity.ts          # Activity/article data
│   ├── useCompany.ts           # Company profile data
│   ├── useCareer.ts            # Career listings & file upload
│   ├── useCertificate.ts       # Certificates
│   ├── useTopProducts.ts       # Top products per company
│   ├── useContactForm.ts       # Form submissions (contact, career, product)
│   ├── useDeviceType.ts        # Responsive breakpoint detection
│   ├── useTranslation.ts       # Translation helper
│   ├── useScrollAnimation.ts   # Intersection Observer animations
│   ├── useAssetLoading.ts      # Production asset loading
│   ├── useDevAssetLoading.ts   # Development asset loading
│   ├── useNavigationCache.ts   # In-memory data cache (5-min TTL)
│   └── usePrefetchNavigation.ts# Route & data prefetching
│
├── assets/                     # Static asset helpers
│   ├── photoAssets.ts          # Optimized WebP photo map
│   └── svgBackgrounds.ts       # Optimized WebP background map
│
├── config/
│   └── loadingConfig.ts        # Loading screen toggles
│
├── lib/
│   └── createEmotionCache.ts   # Emotion cache for MUI SSR
│
└── styles/
    ├── loading-screen.css
    └── background-fallbacks.css
```

### Key conventions

- **`app/`** — Each route folder contains a `page.tsx` (server component with metadata) and usually a `*Client.tsx` companion (client component with `"use client"`).
- **`containers/`** — Section-level components that compose multiple `components/` together. They hold page-specific layout and logic.
- **`components/`** — Fully reusable, page-agnostic UI pieces.
- **`hooks/`** — Business logic isolated from presentation. Each data domain has its own hook.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│  Root Layout (layout.tsx)                                │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Providers                                           │ │
│  │  DataProvider → TranslationContext → NavigationCtx  │ │
│  │  ┌───────────────────────────────────────────────┐  │ │
│  │  │ ThemeWrapper (MUI + Emotion)                  │  │ │
│  │  │  ┌─────────────────────────────────────────┐  │  │ │
│  │  │  │ LoadingWrapper                          │  │  │ │
│  │  │  │  ┌──────────────────────────────────┐   │  │  │ │
│  │  │  │  │ Header                           │   │  │  │ │
│  │  │  │  │ {children} ← Page content        │   │  │  │ │
│  │  │  │  │ Footer                           │   │  │  │ │
│  │  │  │  └──────────────────────────────────┘   │  │  │ │
│  │  │  │ PrefetchWrapper                         │  │  │ │
│  │  │  │ BackgroundParticles                     │  │  │ │
│  │  │  └─────────────────────────────────────────┘  │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

**Data flow:**

```
Page/Container  →  Custom Hook (e.g. useProduct)
                       │
                       ├── reads/writes → DataProvider (React Context + useReducer)
                       │
                       └── calls → useApi (base HTTP client)
                                       │
                                       └── fetch() → Backend API
```

---

## Routing

Next.js App Router uses **file-based routing**. Every folder inside `src/app/` with a `page.tsx` becomes a route.

| Route             | File                          | Server/Client   | Description                    |
| ----------------- | ----------------------------- | --------------- | ------------------------------ |
| `/`               | `app/page.tsx`                | Server + Client | Home — landing page            |
| `/about-us`       | `app/about-us/page.tsx`       | Server + Client | Company values, certifications |
| `/product`        | `app/product/page.tsx`        | Server + Client | Product catalog with filters   |
| `/product/submit` | `app/product/submit/page.tsx` | Server + Client | Custom product request form    |
| `/corporate`      | `app/corporate/page.tsx`      | Server + Client | Subsidiary details             |
| `/activity`       | `app/activity/page.tsx`       | Server + Client | Activity / news listing        |
| `/activity/[id]`  | `app/activity/[id]/page.tsx`  | Server + Client | Single activity detail         |
| `/careers`        | `app/careers/page.tsx`        | Server + Client | Career listings                |
| `/careers/submit` | `app/careers/submit/page.tsx` | Server + Client | Job application form           |
| `/contact-us`     | `app/contact-us/page.tsx`     | Server + Client | Contact form                   |

**Dynamic route:** `/activity/[id]` uses `generateMetadata()` on the server to fetch article data and produce SEO metadata before the page renders.

**Path aliases** (configured in `next.config.ts` and `tsconfig.json`):

- `@/*` → `./src/*`
- `@/components/*`, `@/containers/*`, `@/contexts/*`, `@/hooks/*`, `@/utils/*`, `@/lib/*`

---

## Global Providers & Context

The app wraps all pages in three context providers (nested in `layout.tsx`):

### 1. `DataProvider` — Central Data Store

**File:** `src/contexts/DataProvider.tsx`

Uses `React.useReducer` to manage five data domains:

| Domain          | State shape                                        | Actions                                 |
| --------------- | -------------------------------------------------- | --------------------------------------- |
| **Career**      | `careers[]`, `isLoading`, `error`, `lastUpdated`   | fetch start/success/error, clear, reset |
| **Product**     | `products[]`, `filters`, `pagination`, `isLoading` | fetch start/success/error, clear, reset |
| **Company**     | `companies[]`, `companyDetail`, `isLoading`        | fetch start/success/error, clear, reset |
| **Activity**    | `activities[]`, `pagination`, `isLoading`          | fetch start/success/error, clear, reset |
| **Certificate** | `certificates[]`, `pagination`, `isLoading`        | fetch start/success/error, clear, reset |

**Exported hooks for consuming state:**

- `useDataContext()` — full context (dispatch + state)
- `useCareerContext()`, `useProductContext()`, `useCompanyContext()`, `useActivityContext()`, `useCertificateContext()` — domain-specific context with dispatch
- `useCareerState()`, `useProductState()`, `useActivityState()`, `useCertificateState()` — read-only state selectors

### 2. `TranslationContext` — i18n

**File:** `src/contexts/TranslationContext.tsx`

- Stores `language` (`'en'` | `'id'`) and a translation dictionary.
- Persists the selected language in `localStorage`.
- `t(key)` function supports nested keys (e.g., `t('home.title')`), with English fallback.

### 3. `NavigationContext` — Navigation State

**File:** `src/contexts/NavigationContext.tsx`

- Tracks `isNavigating` and `isFirstLoad` flags.
- Auto-scrolls to top on navigation.
- Used by loading screens and transitions.

---

## Root Layout

**File:** `src/app/layout.tsx`

The root layout assembles the shell that wraps every page:

```
DataProvider
  └── TranslationContextProvider
        └── NavigationContextProvider
              └── ThemeWrapper (MUI theme + Emotion cache)
                    └── LoadingWrapper (shows loading screen until assets ready)
                          ├── Header
                          ├── <main>{children}</main>   ← page content
                          ├── Footer
                          ├── PrefetchWrapper (prefetches routes after initial load)
                          └── BackgroundParticles (animated background)
```

It also sets global metadata (title, description, Open Graph, Twitter cards, JSON-LD structured data) and security headers.

---

## Pages — Detailed Breakdown

### Home `/`

**Files:** `app/page.tsx`

**Sections (from `containers/home/`):**

| Section         | Component              | What it does                                                                      |
| --------------- | ---------------------- | --------------------------------------------------------------------------------- |
| Specialty       | `SpecialtySection`     | Displays specialty product cards (`SpecialtyCard`)                                |
| Top Products    | `TopProductSection`    | Fetches top products per company via `useTopProducts` → renders `TopProductsCard` |
| Custom Products | `CustomProductSection` | CTA to request custom products; opens `ReqProductModal`                           |
| Subsidiaries    | `SubsidiariesSection`  | Lists subsidiary companies via `SubsidiaryCard`                                   |
| Innovation      | `InnovationSection`    | Innovation showcase via `InnovationCard`                                          |

**Hooks used:** `useScrollAnimation` (Intersection Observer to trigger CSS animations on scroll)

**API calls:** `GET /company-top-products` (via `useTopProducts` inside `TopProductSection`)

---

### About Us `/about-us`

**Files:** `app/about-us/page.tsx` → `AboutUsClient.tsx`

**Sections (from `containers/about-us/`):**

| Section       | Component              | What it does                                                            |
| ------------- | ---------------------- | ----------------------------------------------------------------------- |
| Certification | `CertificationSection` | Fetches certificates via `useCertificate` → renders `CertificationCard` |
| Principles    | `PrincipleSection`     | Displays company principles                                             |
| Corporate     | `CorporateSection`     | Corporate overview with `CorporateCard`                                 |
| Values        | `ValueSection`         | Company values with `ValueCard`                                         |

**Hooks used:** `useScrollAnimation`, `useCertificate`

**API calls:** `GET /certificates`

---

### Products `/product`

**Files:** `app/product/page.tsx` → `ProductClient.tsx` → `ProductContainer`

This is one of the more complex pages. It features:

1. **Filter bar** — segment, group SBU, SBU name, group name, free-text search
2. **Product table** — paginated list of products
3. **Access control** — Products may be gated behind an access token; users submit an email to get instant access or receive product details via email
4. **Modals** — `ReqProductModal` (request product info) and `ReqProductSent` (confirmation)

**Hooks used:**

| Hook              | Purpose                                                                           |
| ----------------- | --------------------------------------------------------------------------------- |
| `useProduct`      | Fetches products with filters/pagination; manages product state in `DataProvider` |
| `useTranslation`  | i18n                                                                              |
| `useDeviceType`   | Responsive layout switching                                                       |
| `useSearchParams` | Reads URL search params for pre-applied filters                                   |

**API calls:**

- `GET /products?segment=...&grp_sbu=...&sbu_name=...&grp_name=...&search=...&page=...&limit=...`
- `POST /form-submissions/instant-access` — grants access token
- `POST /form-submissions/send-product-email` — sends product details to email

---

### Custom Product `/product/submit`

**Files:** `app/product/submit/page.tsx` → `CustomProductClient.tsx`

**Layout:** Uses `FormSubmitContainer` which composes:

- `FormBox` — the form (fields, validation, submit)
- `InfoBox` — sidebar with contact information

**Hooks used:** `useContactForm`, `useDeviceType`, `useTranslation`

**API calls:** `POST /email/send/custom-product`

---

### Corporate `/corporate`

**Files:** `app/corporate/page.tsx` → `CorporateContainer`

Displays detailed information about company subsidiaries.

**Components used:**

- `SidebarList` — left sidebar to navigate between companies
- Company detail area — address, description, info boxes, images, product applications, certifications
- Google Maps link via coordinates

**Hooks used:**

| Hook              | Purpose                                                                             |
| ----------------- | ----------------------------------------------------------------------------------- |
| `useCompany`      | Fetches company profiles from `DataProvider`; uses `useNavigationCache` for caching |
| `useTranslation`  | i18n                                                                                |
| `useDeviceType`   | Responsive layout                                                                   |
| `useSearchParams` | Reads `?company=` param for deep-linking                                            |
| `useNavigation`   | Navigation state from `NavigationContext`                                           |

**API calls:** `GET /admin-company-profile?page=...&limit=...`

---

### Activity `/activity`

**Files:** `app/activity/page.tsx` → `ActivityContainer`

Lists activity articles organized by category.

**Categories (two tabs):**

| Tab            | Groups                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------ |
| Sustainability | CSR & Community Engagement, Health Safety & Environmental, Ethical Governance & Compliance |
| Newsroom       | EBER Magazine, EBER Calendar, Company Event                                                |

**Components used:**

- `SidebarList` — category/subcategory navigation (accordion style)
- `ActivityCard` — renders each article card (image, title, date; PDF viewer for calendar/magazine)
- `CardSkeleton` — loading state
- `Pagination` (MUI) — page navigation

**Hooks used:** `useActivity`, `useDeviceType`, `useTranslation`

**API calls:** `GET /articles?group=...&page=...&limit=...`

---

### Activity Detail `/activity/[id]`

**Files:** `app/activity/[id]/page.tsx` → `ActivityDetailContainer`

Displays a single article's full content.

**Key behaviors:**

- Server-side `generateMetadata()` fetches the article for SEO meta tags
- Client component fetches the same article + related articles (same group) for the sidebar
- Article body is rendered as HTML, sanitized via `DOMPurify`
- Related articles shown in `SidebarList` (desktop/tablet only)

**Components used:** `DualColorText`, `ActivityCard`, `ActivityDetailSkeleton`, `ImageWithLoading`, `SidebarList`

**Hooks used:** `useActivity`, `useActivityState` (from `DataProvider`), `useDeviceType`, `useTranslation`

**API calls:**

- `GET /articles/{id}` — single article
- `GET /articles?group=...` — related articles

---

### Careers `/careers`

**Files:** `app/careers/page.tsx` → `CareersClient.tsx`

Displays job openings in an accordion layout.

**Components used:**

- `CareerAccordion` — expandable list items showing job title, status (Full Time / Part Time), description, and an "Apply" button that navigates to `/careers/submit`
- `ListSkeleton` — loading state

**Hooks used:** `useCareer`, `useRouter`, `useTranslation`, `useDeviceType`

**API calls:** `GET /careers?page=...&limit=...`

---

### Submit Application `/careers/submit`

**Files:** `app/careers/submit/page.tsx` → `SubmitApplicationClient.tsx`

**Layout:** Uses `FormSubmitContainer` (same pattern as Contact Us and Custom Product).

**Special behavior:** Supports file upload for CV/resume.

**Hooks used:** `useContactForm`, `useDeviceType`, `useTranslation`

**API calls:**

- `POST /upload/file` — uploads CV (via `useCareer`)
- `POST /careers/apply` — submits application with uploaded file reference

---

### Contact Us `/contact-us`

**Files:** `app/contact-us/page.tsx` → `ContactUsClient.tsx`

**Layout:** Uses `FormSubmitContainer` → `FormBox` + `InfoBox`

**Hooks used:** `useContactForm`, `useDeviceType`, `useTranslation`

**API calls:** `POST /email/send/contact`

---

### 404 Not Found

**Files:** `app/not-found.tsx` → `containers/not-found/index.tsx`

Simple error page with a "Go Home" button. Supports bilingual text via `useTranslation`.

---

## Custom Hooks

### Data-Fetching Hooks

All data-fetching hooks follow the same pattern:

1. Read from / write to `DataProvider` context (centralized state).
2. Use `useApi` as the base HTTP client.
3. Return `{ data, isLoading, error, fetch* }` interfaces.

#### `useApi` — Base HTTP Client

**File:** `src/hooks/useApi.ts`

The foundation for all API calls. Features:

- Configurable base URL (`NEXT_PUBLIC_API_BASE_URL`)
- Request cancellation via `AbortController`
- Configurable timeout and retry logic
- `FormData` support for file uploads
- Sentry error tracking on failures
- Cache disabled by default (`cache: 'no-store'`)

Returns: `{ data, error, loading, status, fetchData, cancelRequest }`

---

#### `useProduct`

**File:** `src/hooks/useProduct.ts`

| Function                 | Endpoint                                    | Purpose                             |
| ------------------------ | ------------------------------------------- | ----------------------------------- |
| `fetchProducts(filters)` | `GET /products`                             | Fetch paginated, filtered products  |
| `requestInstantAccess()` | `POST /form-submissions/instant-access`     | Get access token for gated products |
| `sendProductEmail()`     | `POST /form-submissions/send-product-email` | Email product details to user       |

State: reads/writes `ProductState` in `DataProvider`.

---

#### `useActivity`

**File:** `src/hooks/useActivity.ts`

| Function                  | Endpoint             | Purpose                           |
| ------------------------- | -------------------- | --------------------------------- |
| `fetchActivities(params)` | `GET /articles`      | Fetch paginated articles by group |
| `fetchActivityById(id)`   | `GET /articles/{id}` | Fetch single article              |

State: reads/writes `ActivityState` in `DataProvider`.

---

#### `useCompany`

**File:** `src/hooks/useCompany.ts`

| Function                 | Endpoint                     | Purpose                |
| ------------------------ | ---------------------------- | ---------------------- |
| `fetchCompanies(params)` | `GET /admin-company-profile` | Fetch company profiles |

Features: integrates with `useNavigationCache` (5-minute in-memory cache).

State: reads/writes `CompanyState` in `DataProvider`.

---

#### `useCareer`

**File:** `src/hooks/useCareer.ts`

| Function               | Endpoint            | Purpose               |
| ---------------------- | ------------------- | --------------------- |
| `fetchCareers(params)` | `GET /careers`      | Fetch career listings |
| `uploadCV(file)`       | `POST /upload/file` | Upload CV/resume file |

State: reads/writes `CareerState` in `DataProvider`.

---

#### `useCertificate`

**File:** `src/hooks/useCertificate.ts`

| Function                    | Endpoint            | Purpose              |
| --------------------------- | ------------------- | -------------------- |
| `fetchCertificates(params)` | `GET /certificates` | Fetch certifications |

State: reads/writes `CertificateState` in `DataProvider`.

---

#### `useTopProducts`

**File:** `src/hooks/useTopProducts.ts`

| Function           | Endpoint                    | Purpose                       |
| ------------------ | --------------------------- | ----------------------------- |
| `fetchTopProducts` | `GET /company-top-products` | Fetch top products by company |

State: **local state** (not in `DataProvider`), as this data is only used on the Home page.

---

#### `useContactForm`

**File:** `src/hooks/useContactForm.ts`

A multipurpose form submission hook used by three different pages:

| Page           | Endpoint                          | Payload              |
| -------------- | --------------------------------- | -------------------- |
| Contact Us     | `POST /email/send/contact`        | name, email, message |
| Custom Product | `POST /email/send/custom-product` | name, email, details |
| Career Apply   | `POST /careers/apply`             | FormData with file   |

Returns: `{ isSubmitting, error, isSuccess, submitForm }`

---

### UI / Utility Hooks

#### `useDeviceType`

**File:** `src/hooks/useDeviceType.ts`

Detects the current device type based on viewport width:

| Breakpoint  | Type      |
| ----------- | --------- |
| `< 768px`   | `mobile`  |
| `< 1024px`  | `tablet`  |
| `>= 1024px` | `desktop` |

Returns: `{ type, isMobile, isTablet, isDesktop, width, height }`

Also exports utility functions: `getDeviceInfo()`, `isDeviceType()`, `getCurrentDeviceType()`, `useResponsiveValue()`, `fluidValue()`.

SSR-safe — prevents hydration mismatch by defaulting to `desktop` on the server.

---

#### `useTranslation`

**File:** `src/hooks/useTranslation.ts`

Wraps `TranslationContext` for easy access.

Returns: `{ language, setLanguage, t, getCurrentLanguage }`

---

#### `useScrollAnimation`

**File:** `src/hooks/useScrollAnimation.ts`

Sets up an `IntersectionObserver` that watches elements with animation CSS classes and adds an `animate-visible` class when they scroll into view. Used on the Home and About Us pages.

---

#### `useAssetLoading` / `useDevAssetLoading`

**Files:** `src/hooks/useAssetLoading.ts`, `src/hooks/useDevAssetLoading.ts`

Track asset loading progress to display the loading screen. The production version (`useAssetLoading`) is fast (max 1s). The development version waits for critical images with a 2s safety timeout.

Returns: `{ isLoading, progress, isComplete }`

---

#### `useNavigationCache`

**File:** `src/hooks/useNavigationCache.ts`

Generic in-memory cache with a 5-minute TTL. Uses `useRef` to persist across renders without triggering re-renders. Used by `useCompany` to avoid refetching company data on revisit.

---

#### `usePrefetchNavigation`

**File:** `src/hooks/usePrefetchNavigation.ts`

After the initial page load (2-second delay), prefetches:

- All main routes via `router.prefetch()`
- Company and product data via their respective hooks

Used inside `PrefetchWrapper` in the root layout.

---

## Shared Components

### Layout Components

| Component             | File                              | Purpose                                                                |
| --------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| `Header`              | `components/header/index.tsx`     | Navigation bar with logo, menu, language toggle, homepage hero content |
| `Footer`              | `components/footer/index.tsx`     | Footer with contact info, subsidiaries, copyright                      |
| `BackgroundParticles` | `components/BackgroundParticles/` | tsparticles animated background                                        |
| `LoadingWrapper`      | `components/LoadingWrapper/`      | Shows loading screen until assets are ready                            |
| `PrefetchWrapper`     | `components/PrefetchWrapper/`     | Triggers route/data prefetching after load                             |
| `ThemeWrapper`        | `components/ThemeWrapper/`        | MUI ThemeProvider + Emotion cache                                      |
| `ClientOnly`          | `components/ClientOnly/`          | Renders children only on client (prevents hydration issues)            |

### Card Components

| Component           | File                                     | Used In  | Purpose                                     |
| ------------------- | ---------------------------------------- | -------- | ------------------------------------------- |
| `TopProductsCard`   | `components/Cards/TopProductsCard.tsx`   | Home     | Company logo + top product list             |
| `SpecialtyCard`     | `components/Cards/SpecialtyCard.tsx`     | Home     | Specialty product feature card              |
| `SubsidiaryCard`    | `components/Cards/SubsidiaryCard.tsx`    | Home     | Subsidiary info with location               |
| `InnovationCard`    | `components/Cards/InnovationCard.tsx`    | Home     | Innovation showcase card                    |
| `ValueCard`         | `components/Cards/ValueCard.tsx`         | About Us | Company value with image                    |
| `CorporateCard`     | `components/Cards/CorporateCard.tsx`     | About Us | Corporate info card                         |
| `CertificationCard` | `components/Cards/CertificationCard.tsx` | About Us | Certificate image display                   |
| `ActivityCard`      | `components/Cards/ActivityCard.tsx`      | Activity | Article card (image, title, date, PDF link) |

### Form Components

| Component         | File                           | Purpose                                                  |
| ----------------- | ------------------------------ | -------------------------------------------------------- |
| `FormBox`         | `components/FormBox/index.tsx` | Reusable form with validation (contact, career, product) |
| `InfoBox`         | `components/InfoBox/`          | Sidebar showing contact info (email, phone, address)     |
| `ReqProductModal` | `components/ReqProductModal/`  | Modal form for requesting product information            |
| `ReqProductSent`  | `components/ReqProductSent/`   | Success confirmation modal after product request         |

### Text Components

| Component       | File                        | Purpose                                                     |
| --------------- | --------------------------- | ----------------------------------------------------------- |
| `DualColorText` | `components/dualColorText/` | Text with gradient highlighting for `{highlighted}` markers |
| `TextParser`    | `components/TextParser/`    | Parses text and applies styles to matched patterns          |

### Image Components

| Component                    | File                                     | Purpose                                                       |
| ---------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `ImageWithLoading`           | `components/ImageWithLoading/`           | Image with loading skeleton                                   |
| `ImageWithLoader`            | `components/ImageWithLoader/`            | Image with loading spinner + fallback                         |
| `ImageBackground`            | `components/ImageBackground/`            | Background image with overlay gradient                        |
| `ProgressiveBackgroundImage` | `components/ProgressiveBackgroundImage/` | Background image with progressive loading + gradient fallback |

### Navigation Components

| Component         | File                          | Purpose                                                                |
| ----------------- | ----------------------------- | ---------------------------------------------------------------------- |
| `SidebarList`     | `components/SidebarList/`     | Sidebar navigation with accordion support (Corporate, Activity Detail) |
| `CareerAccordion` | `components/CareerAccordion/` | Expandable job listing items                                           |

### Skeleton / Loading Components

| Component                | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `CardSkeleton`           | Loading skeleton for card grids                  |
| `TableSkeleton`          | Loading skeleton for data tables                 |
| `ListSkeleton`           | Loading skeleton for list items                  |
| `CorporateSkeleton`      | Loading skeleton for corporate page              |
| `ActivityDetailSkeleton` | Loading skeleton for activity detail             |
| `LoadingPage`            | Full-page loading screen                         |
| `ModernLoadingScreen`    | Animated loading screen with logo + progress bar |

### Other Components

| Component   | File                    | Purpose                                                       |
| ----------- | ----------------------- | ------------------------------------------------------------- |
| `PDFViewer` | `components/PDFViewer/` | Flipbook-style PDF viewer modal (zoom, navigation, page flip) |

---

## API Endpoints Summary

All API calls go through `useApi` which uses `NEXT_PUBLIC_API_BASE_URL` as the base URL.

### GET Endpoints

| Endpoint                 | Hook             | Page(s)         | Description                            |
| ------------------------ | ---------------- | --------------- | -------------------------------------- |
| `/products`              | `useProduct`     | Products        | Paginated product catalog with filters |
| `/articles`              | `useActivity`    | Activity        | Paginated articles by group            |
| `/articles/{id}`         | `useActivity`    | Activity Detail | Single article by ID                   |
| `/admin-company-profile` | `useCompany`     | Corporate       | Company profiles with pagination       |
| `/careers`               | `useCareer`      | Careers         | Paginated career listings              |
| `/certificates`          | `useCertificate` | About Us        | Certificates with pagination           |
| `/company-top-products`  | `useTopProducts` | Home            | Top products grouped by company        |

### POST Endpoints

| Endpoint                               | Hook             | Page(s)            | Description                         |
| -------------------------------------- | ---------------- | ------------------ | ----------------------------------- |
| `/email/send/contact`                  | `useContactForm` | Contact Us         | Submit contact form                 |
| `/email/send/custom-product`           | `useContactForm` | Custom Product     | Submit custom product request       |
| `/careers/apply`                       | `useContactForm` | Submit Application | Submit job application (FormData)   |
| `/upload/file`                         | `useCareer`      | Submit Application | Upload CV/resume file               |
| `/form-submissions/instant-access`     | `useProduct`     | Products           | Get access token for gated products |
| `/form-submissions/send-product-email` | `useProduct`     | Products           | Email product details to user       |

---

## State Management Pattern

The project uses **React Context + useReducer** instead of external libraries like Redux or Zustand.

### Flow diagram

```
Component
   │
   ▼
Custom Hook (e.g. useProduct)
   │
   ├── dispatch({ type: 'FETCH_PRODUCTS_START' })    ← sets loading = true
   │
   ├── useApi.fetchData('/products', { params })      ← HTTP call
   │
   ├── on success:
   │   dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload })
   │
   └── on error:
       dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error })
```

### Why this pattern?

- **Centralized state** — all data domains live in one provider, avoiding prop drilling
- **Separation of concerns** — hooks handle logic, components handle presentation
- **Lightweight** — no external dependencies for state management
- **SSR-compatible** — works with Next.js App Router server/client boundary

---

## Translation / i18n

The app supports **English (`en`)** and **Indonesian (`id`)**.

### How it works

1. `TranslationContext` loads a translation dictionary and stores the active language.
2. Language preference is persisted in `localStorage`.
3. Components call `const { t } = useTranslation()` and use `t('key.subkey')` to get translated strings.
4. If a key is missing in the active language, it falls back to English.

### Adding translations

Add key-value pairs to the translation dictionary (structure depends on where translations are stored — check the context provider for the source file/object).

---

## Performance Optimizations

| Optimization             | Implementation                                                                  |
| ------------------------ | ------------------------------------------------------------------------------- |
| **Image optimization**   | `sharp` + Next.js Image component (AVIF/WebP, responsive sizes)                 |
| **Route prefetching**    | `PrefetchWrapper` prefetches all main routes after initial load                 |
| **Data prefetching**     | Company and product data prefetched after 2s delay                              |
| **Navigation cache**     | `useNavigationCache` — 5-minute in-memory TTL cache for company data            |
| **Request cancellation** | `AbortController` in `useApi` cancels in-flight requests on unmount             |
| **Loading screen**       | `LoadingWrapper` shows progress until DOM, fonts, and critical images are ready |
| **Skeleton loading**     | Skeleton components for every page type prevent layout shift                    |
| **Security headers**     | XSS protection, HSTS, content security policies (in `next.config.ts`)           |
| **Standalone output**    | `output: 'standalone'` for optimized production Docker builds                   |
| **Sentry monitoring**    | Error tracking on API failures and client-side errors                           |
