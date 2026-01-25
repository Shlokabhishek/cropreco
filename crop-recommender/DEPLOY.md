# Deployment Guide

This guide covers deploying both the frontend and backend of the Crop Recommender application.

## Architecture Overview

- **Frontend**: React + Vite app (can be deployed to Vercel, Netlify, etc.)
- **Backend**: Node.js + Express API (can be deployed to Railway, Render, Heroku, etc.)
- **Database**: SQLite (for production, consider PostgreSQL or MySQL)

## Frontend Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

#### Option 2: Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project" and import your repository

4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add environment variables:
   ```
   VITE_API_BASE=https://your-backend-url.com/api
   ```

6. Click "Deploy"

### Deploy to Netlify

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

Or use the Netlify dashboard with:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Backend Deployment

### Deploy to Railway

Railway is recommended for Node.js apps with SQLite.

1. Go to [railway.app](https://railway.app) and sign in

2. Click "New Project" → "Deploy from GitHub repo"

3. Select your repository

4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Add environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=your-super-secure-jwt-secret-change-this
   OPENWEATHER_API_KEY=your-api-key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

6. Deploy and get your backend URL

### Deploy to Render

1. Go to [render.com](https://render.com) and sign in

2. Click "New" → "Web Service"

3. Connect your repository

4. Configure:
   - **Name**: crop-recommender-api
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Add environment variables (same as Railway)

6. Deploy

### Deploy to Heroku

1. Install Heroku CLI

2. Create a `Procfile` in the `server` directory:
   ```
   web: npm start
   ```

3. Deploy:
   ```bash
   cd server
   heroku create crop-recommender-api
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   git push heroku main
   ```

## Build Settings

Vercel will use these settings (from `vercel.json`):

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Environment Variables

### Frontend (.env)
```bash
VITE_API_BASE=https://your-backend-url.com/api
```

### Backend (server/.env)
```bash
NODE_ENV=production
PORT=3001
JWT_SECRET=generate-a-secure-random-string-at-least-32-chars
OPENWEATHER_API_KEY=your-openweather-api-key
FRONTEND_URL=https://your-frontend-url.com
DATABASE_PATH=./data/crop_recommender.db
```

## Database Considerations

### SQLite (Development & Small Scale)
- Included by default
- File-based, no external database needed
- Good for < 10,000 users
- Automatic initialization

### PostgreSQL (Production Recommended)

For production, consider migrating to PostgreSQL:

1. Install pg package:
   ```bash
   cd server
   npm install pg
   ```

2. Update `server/src/config/database.ts` to use PostgreSQL

3. Set `DATABASE_URL` environment variable:
   ```bash
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

### MySQL Alternative

Or use MySQL:
```bash
npm install mysql2
```

## Post-Deployment Steps

1. **Update Frontend URL**: After backend deployment, update frontend's `VITE_API_BASE`

2. **Update CORS**: In backend, update `FRONTEND_URL` to match your frontend domain

3. **Test API**: Verify backend is accessible:
   ```bash
   curl https://your-backend-url.com/health
   ```

4. **Test Authentication**: Register a user and verify JWT tokens work

5. **Seed Data**: Consider adding initial market prices and crop data

## Monitoring & Maintenance

### Health Checks
- Frontend: Check if it loads at your domain
- Backend: Hit `/health` endpoint regularly

### Logs
- **Railway**: View logs in dashboard
- **Render**: Check logs in dashboard
- **Vercel**: View function logs

### Database Backups

For SQLite:
```bash
# Backup database
cp server/data/crop_recommender.db backups/backup-$(date +%Y%m%d).db
```

For PostgreSQL:
```bash
pg_dump $DATABASE_URL > backup.sql
```

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend domain
- Check that backend has CORS middleware configured

### Database Connection Issues
- Verify `DATABASE_PATH` or `DATABASE_URL` is correct
- Check file permissions for SQLite
- Verify PostgreSQL credentials

### API Not Responding
- Check backend logs
- Verify environment variables are set
- Test `/health` endpoint

### Build Failures
- Clear node_modules and reinstall
- Check Node.js version (requires 18+)
- Verify all dependencies are in package.json

## Security Checklist

- [ ] Change `JWT_SECRET` to a secure random string
- [ ] Never commit `.env` files
- [ ] Enable HTTPS (automatic on Vercel/Railway/Render)
- [ ] Set `NODE_ENV=production`
- [ ] Implement rate limiting (TODO: add express-rate-limit)
- [ ] Add input validation (TODO: add express-validator)
- [ ] Set secure headers (TODO: add helmet.js)

## Scaling Considerations

### Performance
- Use CDN for frontend assets (Vercel provides this)
- Enable gzip compression on backend
- Add Redis for caching weather/market data
- Optimize database queries with indexes

### Horizontal Scaling
- Backend can scale horizontally with load balancer
- Consider moving to PostgreSQL for better concurrency
- Use separate Redis for session storage

## Cost Estimates

### Free Tier Options
- **Frontend**: Vercel (free), Netlify (free)
- **Backend**: Railway ($5/month with $5 credit), Render (free tier available)
- **Database**: SQLite (free, file-based)

### Paid Options
- Railway: ~$5-10/month
- Render: $7/month (starter)
- PostgreSQL: Neon.tech (free tier), Railway ($5-20/month)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Deployment](https://vitejs.dev/guide/static-deploy.html)

## Support

For issues or questions:
1. Check the [README.md](README.md) for setup instructions
2. Review [BACKEND_SETUP.md](BACKEND_SETUP.md) for backend details
3. Check server logs for error messages
4. Verify environment variables are set correctly


If you need to add environment variables:

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add any required variables (e.g., API keys)

## Automatic Deployments

Once connected to Git:

- **Production**: Deploys when you push to `main` branch
- **Preview**: Deploys for every pull request

## Custom Domain

To add a custom domain:

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

If deployment fails:

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test local build: `npm run build`
4. Test preview: `npm run preview`

## Live URL

After deployment, Vercel will provide a URL like:
`https://your-project-name.vercel.app`
