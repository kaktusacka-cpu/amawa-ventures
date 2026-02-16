# Amawa Website

Next.js + TypeScript + shadcn UI website with:
- Multilanguage routing: English (`/en`) default, Spanish (`/es`), Slovak (`/sk`)
- Locale switcher in navbar (keeps current page)
- Sanity CMS integration with locale-aware content and fallback copy

## Run locally

```bash
npm install
npm run dev
```

## Sanity configuration

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` (optional, needed only for protected datasets)

If Sanity vars are missing, the app uses built-in fallback copy for all 3 languages.

## Expected Sanity model

The app fetches one `homePage` document with `slug.current == "home"` and localized fields in shape:
- `field.en`, `field.es`, `field.sk`

The query is in `src/lib/sanity/queries.ts`.

## Routes

- `/en`, `/es`, `/sk`
- `/en/about`, `/es/about`, `/sk/about`
- `/en/experiences`, `/es/experiences`, `/sk/experiences`
- `/en/what-we-do`, `/es/what-we-do`, `/sk/what-we-do`
- `/en/collaborate`, `/es/collaborate`, `/sk/collaborate`

Middleware redirects non-localized paths to English.
