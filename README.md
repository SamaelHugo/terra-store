# TERRA

Premium supplements store with glassmorphism design and Strapi CMS.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=fff)
![Strapi](https://img.shields.io/badge/Strapi-4945FF?logo=strapi&logoColor=fff)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)

🔗 **Live:** [terra-store-gamma.vercel.app](https://terra-store-gamma.vercel.app)

---

## Overview

Fullstack e-commerce store with glassmorphism UI — frosted glass cards, colorful blobs, video hero. Built with Strapi CMS as admin backend and Supabase for data.

## Features

- **Glassmorphism design** — frosted glass cards, buttons, navbar with colorful background blobs
- **Video hero** — fullscreen video background with photo fallback
- **Product catalog** — filterable by category with animated cards
- **Cart** — Zustand state management with persistent storage
- **CMS** — Strapi admin for products and categories
- **Responsive** — desktop + mobile

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Animation | Framer Motion |
| State | Zustand |
| CMS | Strapi |
| Database | Supabase (PostgreSQL) |
| Deploy | Vercel (frontend), local (Strapi) |

## Run Locally
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (requires Node 20)
cd backend
nvm use 20
npm install
npm run develop
```
