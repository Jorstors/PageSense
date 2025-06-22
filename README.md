



<div align="center">
  <a href="https://www.pagesense.co/tool">
    <img src="public/Title-WOB.png" alt="PageSense Logo" width="400">
  </a>
  <h2>An AI-powered landing-page auditing tool.
</div>


<div align="center">

[![Vercel](https://img.shields.io/badge/deploy-on%20Vercel-blue?logo=vercel)](https://vercel.com/new)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

</div>

PageSense is an intelligent website auditing platform that uses AI to analyze landing pages and provide actionable conversion optimization recommendations. Built with Next.js 15 and powered by OpenAI, it generates comprehensive PDF reports and delivers them via email.

🌐 **Available at: [pagesense.co](https:/www.pagesense.co/tool)**

## ✨ Features

- **🤖 AI-Powered Analysis** - Uses OpenAI's GPT-4o to identify conversion blockers and optimization opportunities
- **📄 PDF Report Generation** - Creates professional audit reports using Puppeteer and Chromium
- **📧 Email Delivery** - Automatically sends reports to users via Brevo API
- **🔒 Rate Limiting** - Firebase-powered rate limiting to prevent abuse
- **⚡ Real-time Processing** - Serverless functions for fast, scalable auditing
- **🎨 Modern UI** - Beautiful interface built with Tailwind CSS and shadcn/ui
- **📱 Responsive Design** - Works seamlessly across all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes (Serverless Functions)
- **AI**: OpenAI GPT-4o-mini-search-preview
- **PDF Generation**: Puppeteer + @sparticuz/chromium (serverless-optimized)
- **Email**: Brevo API for transactional emails
- **Database**: Firebase Firestore for rate limiting
- **Deployment**: Vercel-ready with automatic serverless function deployment

## 📁 Project Structure

```
pagesense/
├── app/
│   ├── api/
│   │   └── audit/
│   │       └── route.ts          # Main audit API endpoint
│   ├── about/
│   ├── templates/
│   ├── tool/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── audit-form/
│   │   └── AuditForm.tsx         # Main audit form component
│   ├── ui/                       # shadcn/ui components
│   └── magicui/                  # Custom UI components
├── lib/
│   └── utils.ts
└── public/
    └── [assets]
```

## 🔧 API Endpoints

### POST `/api/audit`
Main audit endpoint that processes website analysis requests.

**Request Body:**
```json
{
  "url": "https://example.com",
  "email": "user@example.com",
  "subscribe": true
}
```

**Response:**
- Returns PDF file as downloadable attachment
- Sends email with audit report to provided email address
- Implements rate limiting (3 requests per 24 hours per email)

## 🎯 How It Works

1. **User Input** - User enters website URL and email address
2. **AI Analysis** - OpenAI analyzes the landing page for conversion blockers
3. **Report Generation** - Puppeteer generates a professional PDF report
4. **Email Delivery** - Brevo sends the report to the user's email
5. **Download** - User receives immediate PDF download


## 🔍 Key Features

### Serverless Function Architecture
- API routes automatically become serverless functions on Vercel
- Optimized for cold starts with efficient imports
- Environment-aware (local vs. production) configuration

### Rate Limiting
- Firebase Firestore tracks audit requests per email
- Configurable limits (currently 3 per 24 hours)
- Graceful fallback if Firebase is unavailable

### PDF Generation
- Uses Puppeteer in local development
- Switches to puppeteer-core + @sparticuz/chromium for serverless
- Responsive HTML template with professional styling

## 📝 License

This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

See the [LICENSE](./LICENSE) file for full details.

## 🙋‍♂️ Support

For support, email info@pagesense.co or create an issue in this repository.

---

Built with ❤️
