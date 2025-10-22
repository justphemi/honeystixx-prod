# Honeystixx - Women's Health Diagnosis Kit E-commerce Platform

A complete, production-ready e-commerce web application built with Next.js, Firebase, Paystack, and Resend for selling women's health diagnosis kits.

## Features

### Customer-Facing Features
- **Landing Page**: Beautiful, responsive landing page with product showcase
- **Order Flow**: Complete checkout process with Paystack payment integration
- **Contact Form**: Customer inquiry form with email notifications
- **Complaint System**: Dedicated complaint submission and tracking
- **Thank You Page**: Professional order confirmation with detailed summary
- **Email Notifications**: Automated emails for orders, forms, and complaints

### Admin Features
- **Secure Dashboard**: Password-protected admin panel
- **Order Management**: View, filter, and update order statuses
- **Form Management**: Review and respond to customer inquiries
- **Complaint Handling**: Track and respond to customer complaints
- **Product Management**: Update product details, pricing, and availability
- **CSV Export**: Download orders, forms, and complaints as CSV files

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Payments**: Paystack
- **Email**: Resend
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created
- Paystack account (test or live)
- Resend account

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file based on `.env.example`:
   \`\`\`env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Paystack Configuration
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
   PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

   # Resend Configuration
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@honeystixx.com
   ADMIN_EMAIL=admin@honeystixx.com

   # Admin Authentication
   ADMIN_PASSWORD=your_secure_admin_password

   # WhatsApp Configuration
   NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. Initialize the product in Firebase:
   \`\`\`bash
   npm run dev
   # Then run the initialization script
   node scripts/init-product.ts
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Enable Firebase Storage
4. Copy your Firebase configuration to `.env`
5. Set up Firestore security rules (see below)

### Firestore Security Rules

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Product - read only for public
    match /product/{document=**} {
      allow read: if true;
      allow write: if false; // Only via admin API
    }
    
    // Orders - no public access
    match /orders/{document=**} {
      allow read, write: if false; // Only via API
    }
    
    // Forms - no public access
    match /forms/{document=**} {
      allow read, write: if false; // Only via API
    }
    
    // Complaints - no public access
    match /complaints/{document=**} {
      allow read, write: if false; // Only via API
    }
  }
}
\`\`\`

## Paystack Setup

1. Create a Paystack account at [paystack.com](https://paystack.com)
2. Get your API keys from the dashboard
3. Add your public and secret keys to `.env`
4. Set up webhook URL: `https://yourdomain.com/api/webhooks/paystack`
5. Copy the webhook secret to your environment variables

## Resend Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key
4. Add the API key to `.env`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables
4. Deploy

### Environment Variables for Production

Make sure to update these for production:
- Use production Firebase credentials
- Use live Paystack keys
- Update `NEXT_PUBLIC_APP_URL` to your domain
- Use a strong `ADMIN_PASSWORD`

## Admin Access

Access the admin dashboard at `/admin/login` using the password set in `ADMIN_PASSWORD` environment variable.

## Project Structure

\`\`\`
honeystixx/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   ├── complaints/     # Complaint pages
│   ├── contact/        # Contact form pages
│   ├── order/          # Order page
│   ├── thank-you/      # Thank you page
│   └── page.tsx        # Landing page
├── components/
│   ├── admin/          # Admin components
│   ├── ui/             # UI components
│   └── ...             # Other components
├── lib/
│   ├── auth/           # Authentication utilities
│   ├── email/          # Email templates and utilities
│   ├── firebase/       # Firebase configuration
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
└── scripts/            # Initialization scripts
\`\`\`

## Support

For issues or questions, please contact support@honeystixx.com

## License

© 2025 Honeystixx. All rights reserved.
