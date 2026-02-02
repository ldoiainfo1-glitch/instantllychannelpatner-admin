# Channel Partner Admin Portal

Standalone admin portal for InstantllyCards channel partner management.

## 🚀 Quick Start

### Local Development
```bash
npm run dev
```
Then open: http://localhost:3000

### Deploy to Vercel

**Option 1: Via Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option 2: Via GitHub**
1. Push this folder to a new GitHub repository
2. Go to https://vercel.com/new
3. Import the repository
4. Deploy!

## 🔐 Login Credentials

- **Username:** `admin`
- **Password:** `admin123`

## 📁 Pages

- `/` or `/index.html` - Admin Login
- `/dashboard.html` - Main Dashboard
- `/ads.html` - Advertisement Management
- `/credits.html` - Credits & Transactions
- `/video-upload.html` - Video Upload

## 🔧 Backend Connection

The admin portal connects to:
```
https://api.instantllycards.com/api
```

Endpoints used:
- `POST /admin-auth/login` - Admin login
- `GET /admin-auth/verify` - Token verification
- `GET /admin/users-stats` - User statistics
- `GET /admin/all-transactions` - Transaction history
- `POST /admin/transfer-credits` - Admin credit transfers

## 🔑 Authentication

- Uses JWT tokens stored as `channelPartnerToken`
- Token expires in 7 days
- Auto-redirect to login if token missing/invalid
- "Remember me" option for 30-day persistence

## 📦 Deployment

### Vercel Deployment
This is a static HTML site that deploys directly to Vercel.

**Suggested deployment URL:**
```
https://instantlly-admin.vercel.app
```

## 🏗️ Project Structure

```
Channel-Partner-Admin/
├── index.html         → Login page
├── dashboard.html     → Main dashboard
├── ads.html          → Ad management
├── credits.html      → Credit management
├── video-upload.html → Video upload
├── package.json      → Project config
├── vercel.json       → Vercel config
└── README.md         → This file
```

## 🔒 Security Features

- JWT-based authentication
- XSS protection headers
- Frame protection (X-Frame-Options: DENY)
- Content-type sniffing protection
- HTTPS enforced on production
