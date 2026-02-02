# 🚀 DEPLOYMENT GUIDE

## Complete Deployment Instructions for Channel Partner Admin Portal

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- Git installed locally

---

## 🎯 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `instantlly-admin` (or any name you prefer)
3. Description: "InstantllyCards Channel Partner Admin Portal"
4. **Keep it Private** (recommended for admin portals)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Code to GitHub

Open terminal and run these commands from the `Channel-Partner-Admin` folder:

```bash
# Already done: git init
# Already done: git add -A
# Already done: git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/instantlly-admin.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Find and select `instantlly-admin` repository
5. Click "Import"
6. Project settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty (static site)
   - **Output Directory:** Leave empty
7. Click "Deploy"
8. Wait 30-60 seconds
9. Your admin portal is live! 🎉

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## 🌐 Access Your Deployment

After deployment, Vercel will give you a URL like:

```
https://instantlly-admin.vercel.app
```

Or

```
https://instantlly-admin-xyz123.vercel.app
```

### Login Credentials:
- **Username:** `admin`
- **Password:** `admin123`

---

## 🔧 Custom Domain (Optional)

### Add Custom Domain in Vercel:

1. Go to your project in Vercel dashboard
2. Click "Settings" tab
3. Click "Domains" in sidebar
4. Add your domain (e.g., `admin.instantlly.com`)
5. Follow Vercel's DNS configuration instructions

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│   CHANNEL PARTNER ADMIN PORTAL          │
│   (Separate Vercel Deployment)          │
│                                         │
│   https://instantlly-admin.vercel.app   │
│                                         │
│   Pages:                                │
│   - Login (index.html)                  │
│   - Dashboard                           │
│   - Ads Management                      │
│   - Credits Management                  │
│   - Video Upload                        │
└─────────────────────────────────────────┘
                    │
                    │ API Calls
                    ↓
┌─────────────────────────────────────────┐
│         BACKEND (Render)                │
│                                         │
│   instantlly-cards-backend-6ki0         │
│   .onrender.com/api                     │
│                                         │
│   Endpoints:                            │
│   - /admin-auth/login                   │
│   - /admin/users-stats                  │
│   - /admin/all-transactions             │
│   - /admin/transfer-credits             │
└─────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Admin login page loads at root URL
- [ ] Can login with admin/admin123
- [ ] Dashboard displays after login
- [ ] Ads page shows advertisements
- [ ] Credits page shows transactions
- [ ] All navigation links work
- [ ] Logout redirects to login
- [ ] HTTPS is enforced (automatic on Vercel)

---

## 🔐 Security Notes

1. **Change Default Password**: After first deployment, create a new admin user with secure password in the database
2. **HTTPS**: Automatically enforced by Vercel
3. **Token Expiration**: JWT tokens expire after 7 days
4. **Private Repository**: Keep GitHub repo private for security
5. **Environment Variables**: No secrets exposed in frontend code

---

## 🐛 Troubleshooting

### Issue: Login returns 404
**Solution:** Backend might be sleeping (Render free tier). Wait 30 seconds and try again.

### Issue: Token expired
**Solution:** Click logout and login again.

### Issue: Page not found
**Solution:** Check vercel.json is included in deployment.

### Issue: Cannot connect to backend
**Solution:** Verify backend URL is correct:
```
https://api.instantllycards.com/api
```

---

## 📞 Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Create issue in your repo
- Backend Status: Check Render dashboard

---

## 🎉 Success!

Your Channel Partner Admin Portal is now deployed separately from the user frontend!

**Next Steps:**
1. Bookmark your admin URL
2. Share with authorized admins only
3. Monitor via Vercel dashboard
4. Check backend logs in Render dashboard

---

## 📝 Update Instructions

To deploy changes:

```bash
# Make changes to files
git add -A
git commit -m "Description of changes"
git push origin main
```

Vercel will automatically deploy the new version!

---

**Deployment Date:** November 17, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
