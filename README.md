



<div align="center">
  <a href="https://www.pagesense.co/">
    <img src="public/Title-WOB.png" alt="PageSense Logo" width="400">
  </a>
  <h2>An intelligent website auditing platform with user dashboard
</div>



#### PageSense is an AI-powered website auditing platform that analyzes landing pages and provides actionable conversion optimization recommendations. Built with Next.js 15 and powered by OpenAI, it generates comprehensive reports that users can access from their personal dashboard.


<div align="center">

🌐 **Available at: [pagesense.co](https://www.pagesense.co/)**
</div>
<br/>
<div align="center">

[![Vercel](https://img.shields.io/badge/deploy-on%20Vercel-blue?logo=vercel)](https://vercel.com/new)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

</div>

## ✨ Features

- **🤖 AI-Powered Analysis** - Uses OpenAI's GPT-4o to identify conversion blockers and optimization opportunities
- **📊 User Dashboard** - Personal dashboard to view, manage and track all your website audits
- **🔑 User Authentication** - Secure authentication system using Firebase Authentication
- **🧠 Audit History** - View and revisit past audits with detailed reports
- **🔒 Rate Limiting** - Firebase-powered rate limiting to prevent abuse
- **⚡ Real-time Processing** - Serverless functions for fast, scalable auditing
- **🎨 Modern UI** - Beautiful interface built with Tailwind CSS, shadcn/ui, and motion primitives
- **📱 Responsive Design** - Works seamlessly across all devices with mobile-optimized dashboard

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components, Framer Motion
- **Backend**: Next.js API Routes (Serverless Functions)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore for user data and audit storage
- **AI**: OpenAI GPT-4o API integration
- **UI Components**: Custom MagicUI and motion primitives for enhanced visual effects
- **Deployment**: Vercel-ready with automatic serverless function deployment

## 📁 Project Structure

```
pagesense/
├── app/
│   ├── api/
│   │   ├── audit/
│   │   │   └── route.ts          # Main audit API endpoint
│   │   └── hello/
│   │       └── route.ts
│   ├── about/
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── dashboard/                # User dashboard
│   │   ├── ClientWrapper.tsx
│   │   ├── DashboardClient.tsx
│   │   └── page.tsx
│   ├── templates/
│   ├── tool/                     # Audit tool page
│   ├── privacy/
│   ├── terms/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── audit-form/
│   │   ├── AuditForm.tsx         # Main audit form component
│   │   └── AuditTitle.tsx
│   ├── ui/                       # shadcn/ui components
│   ├── magicui/                  # Enhanced UI components with animations
│   └── motion-primitives/        # Animation primitives
├── contexts/
│   └── AuthContext.tsx           # Authentication context provider
├── lib/
│   ├── Firebase/
│   │   └── firebaseInit.ts       # Firebase configuration
│   ├── utils.ts
│   └── seo.ts
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
  "email": "user@example.com"
}
```

**Response:**
- Analyzes the website using OpenAI
- Stores the audit result in the user's Firebase collection
- Returns HTML report data that can be viewed in the dashboard
- Implements rate limiting for free users

### GET `/api/hello`
Test endpoint for health checks.

## 🎯 How It Works

1. **User Authentication** - Users sign up or log in to access the platform
2. **URL Submission** - User enters a website URL to audit from their dashboard
3. **AI Analysis** - OpenAI analyzes the landing page for conversion optimization opportunities
4. **Report Generation** - The system generates a detailed HTML report
5. **Dashboard Access** - Users can view all their audits in their personal dashboard
6. **Historical Data** - Previous audits are stored and can be accessed at any time


## 🔍 Key Features

### User Authentication System
- Firebase Authentication for secure user accounts
- Email/password and Google sign-in options
- Password reset functionality
- Protected routes for authenticated users only

### Interactive Dashboard
- Mobile-optimized with dock-style navigation on small screens
- Overview of account information and recent activity
- Access to all previous website audits
- Quick view of audit scores and details

### Responsive Design
- Mobile-first approach with adaptive layouts
- Custom components from shadcn/ui
- Enhanced UI elements with Framer Motion animations
- Optimized for all screen sizes and devices

### Firebase Integration
- Firestore database for user data storage
- Real-time data updates
- Secure data access with authentication rules
- Efficient document structure for performance

### Modern UI Components
- Custom MagicUI components for enhanced visual effects
- Motion primitives for smooth animations
- Dock navigation for mobile interfaces
- Interactive dialogs for viewing audit reports

## 📝 License

This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

See the [LICENSE](./LICENSE) file for full details.

## 🙋‍♂️ Support

For support, email info@pagesense.co or create an issue in this repository.

---

Built with ❤️ by [Jorstors](https://github.com/Jorstors)
