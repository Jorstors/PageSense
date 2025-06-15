<img src="public/Title-WOB.png" alt="Title WOB" width="800"/>


[![Vercel](https://img.shields.io/badge/deploy-on%20Vercel-blue?logo=vercel)](https://vercel.com/new)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**PageSense** is an AI-powered landing-page audit tool. Submit any public URL and instantly get a PDF report of your top conversion blockers with concrete improvement suggestions.

🔗 Live Demo: https://www.pagesense.co/tool

## Table of Contents

- [Features](#features)  
- [Architecture & Tech](#architecture--tech)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Key Learnings](#key-learnings)  
- [Future Improvements](#future-improvements)  
- [License](#license)

## Features

- 🚀 **Conversion Audit**: Uses OpenAI (gpt-4o-mini) to identify 3–5 major blockers (headlines, CTAs, layout, load time)  
- 📄 **PDF Report**: Serverless Puppeteer-Core + Chromium generates styled PDF summaries  
- 📧 **Email Delivery**: Brevo API sends reports & confirmations  
- 🔒 **Rate Limiting & Storage**: Firebase Admin SDK (Firestore) enforces per-email limits and logs requests  
- ⚛️ **Modern UI**: React + Vite + Tailwind CSS + Shadcn/UI & Radix components, dark/light mode, responsive design  
- 🔄 **Dev ↔ Prod Parity**: `vercel dev` uses same serverless functions & env; prod deploy serves static `dist/`

## Architecture & Tech

- **Frontend**  
  - TypeScript, React, Vite (HMR)  
  - Tailwind CSS, tailwind-merge  
  - Shadcn/UI, Radix UI primitives, framer-motion for smooth UI  
  - react-hook-form + Zod for type-safe forms

- **Backend (Serverless)**  
  - Vercel Functions (`/api/audit.ts`, `/api/send-confirmation.ts`, etc.)  
  - OpenAI Chat API for NLP analysis  
  - Puppeteer-Core + @sparticuz/chromium for PDF generation  
  - Firebase Admin SDK (Firestore) for rate limiting & audit logs  
  - Brevo transactional email API  

- **DevOps & CI/CD**  
  - Vercel config (`vercel.json`) with `devCommand` & static build  
  - Secure .env handling for API keys  
  - ESLint, Prettier for code quality  
  - Automated deploys on git push to main  

## Getting Started

1. **Clone**  
   ```bash
   git clone https://github.com/jorstors/pagesense.git
   cd pagesense
   ```

2. **Setup environment**  
   Copy `.env.example` → `.env` and fill in keys for:  
   ```
   OPENAI_API_KEY
   FIREBASE_PROJECT_ID
   FIREBASE_CLIENT_EMAIL
   FIREBASE_PRIVATE_KEY
   BREVO_API_KEY
   VITE_PUBLIC_URL
   ```

3. **Install & Run Dev**  
   ```bash
   npm install
   vercel dev
   ```
   Frontend runs on `http://localhost:3000`, serverless APIs on `/api/*`.

4. **Build & Preview**  
   ```bash
   npm run build
   npm run start
   ```

## Usage

- Navigate to `/`
- Enter a landing page URL and your email
- Receive a PDF report via email with actionable insights

## Key Learnings

- Designed a **scalable serverless** architecture using Vercel Functions  
- Integrated **multiple 3rd-party APIs** (OpenAI, Brevo, Firebase) in a cohesive workflow  
- Mastered **PDF generation** in serverless (Puppeteer-Core + headless Chromium)  
- Enforced **type safety & validation** end-to-end with TypeScript, Zod, react-hook-form  
- Automated **dev ↔ prod parity** and CI/CD for seamless local and cloud deployments  

## Future Improvements

- Add user dashboard to view past audits  
- Enhance PDF design with charted metrics (load times, accessibility scores)  
- Introduce GitHub Actions for unit/integration tests  
- Expand rate limiting to IP + email-based tiers  

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

> Crafted to showcase full-stack TypeScript expertise, serverless design, and modern CI/CD for recruiters and collaborators alike.
