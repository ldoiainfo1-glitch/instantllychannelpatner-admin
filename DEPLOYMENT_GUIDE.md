# Channel Partner Admin Backend Configuration

## Backend URLs

### Development
- **Local Backend**: `http://localhost:5000/api`
- **Local Admin Panel**: `http://localhost:5173`

### Production
- **Main Backend**: `https://instantllychannelpatner.onrender.com/api`
- **Admin Panel**: `https://instantllychannelpatneradmin.vercel.app`

## Environment Variables for Admin Backend

### For Render.com Deployment
Create a new service on Render.com with these environment variables:

```env
# Database
MONGODB_URI=mongodb+srv://channel_partner_database:Newpass123@channelpartner.oe0ixs2.mongodb.net/channelpartner?retryWrites=true&w=majority

# Security
JWT_SECRET=inst@ntly_c@rds_pr0ducti0n_s3cr3t_k3y_2024_v1.0

# Server
PORT=10000
NODE_ENV=production

# CORS Origins (Add your admin panel domains)
CORS_ORIGINS=http://localhost:5173,https://instantllychannelpatneradmin.vercel.app,https://instantllychannelpatner-admin.netlify.app
```

### For Vercel Deployment
Create `vercel.json` in admin panel root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Deployment Instructions

### 1. Deploy Backend to Render.com
1. Create new Web Service on Render.com
2. Connect to your GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && node server/index.js`
5. Add environment variables listed above
6. Deploy

### 2. Deploy Admin Panel to Vercel
1. Connect Vercel to your GitHub repository
2. Set root directory to the admin folder
3. Deploy
4. Update config.js with production URLs

### 3. Update DNS (Optional)
- Point custom domain to Vercel deployment
- Update CORS_ORIGINS with custom domain

## API Endpoints

### Authentication
- `POST /api/admin-auth/login` - Admin login
- `GET /api/admin-auth/verify` - Verify token

### Credits Management  
- `GET /api/admin/users-stats` - User statistics
- `GET /api/admin/all-transactions` - All transactions
- `POST /api/admin/transfer-credits` - Admin transfer credits
- `POST /api/credits/search-users` - Search users

### Application Management
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/applications/pending` - Pending applications
- `PUT /api/admin/applications/:id/approve` - Approve application
- `PUT /api/admin/applications/:id/reject` - Reject application

## Security Notes

1. **Change Default Credentials**: Update admin username/password in production
2. **JWT Secret**: Use strong, unique JWT secret for production
3. **HTTPS Only**: Ensure all production endpoints use HTTPS
4. **CORS**: Whitelist only necessary domains
5. **Rate Limiting**: Consider adding rate limiting for admin endpoints