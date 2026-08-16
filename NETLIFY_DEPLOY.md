# Netlify Deployment Guide for BHA Electrical LLC

## Quick Setup (5 minutes)

### Step 1: Connect GitHub to Netlify
1. Go to: https://netlify.com
2. Sign up (free) or log in
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" and authorize
5. Select repository: `tschuhwerk/bha-electrical`
6. Click "Deploy site"

**Netlify will automatically:**
- Read `netlify.toml` configuration
- Build the site (`npm install`)
- Deploy the `public/` directory
- Set up Netlify Functions

### Step 2: Configure Email (IMPORTANT)
1. In Netlify dashboard, go to **Settings** → **Environment variables**
2. Add these environment variables:
   ```
   EMAIL_SERVICE = gmail
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASSWORD = your-app-password
   BUSINESS_EMAIL = business@gmail.com
   ```

3. **For Gmail:**
   - Enable 2FA on your Google account
   - Go to: https://myaccount.google.com/apppasswords
   - Generate an app password
   - Use that password (not your Gmail password!)

### Step 3: Verify Deployment
1. Netlify will show you your site URL (e.g., `https://your-site.netlify.app`)
2. Visit the URL and test the form
3. Check your email to confirm receipt

## What's Being Deployed

### Files:
- **netlify.toml** - Netlify configuration
- **netlify/functions/send-email.js** - Serverless function to handle forms
- **public/** - Static website files
- **package.json** - Dependencies (nodemailer for email)

### What Works:
✅ Website accessible from anywhere  
✅ Service request form  
✅ Email notifications (to business)  
✅ Confirmation email (to customer)  
✅ Free tier (up to 125k function calls/month)  

### What's Different from Docker:
- No Express server running
- Netlify handles hosting
- Netlify Functions (serverless) handle email
- Automatic HTTPS
- Global CDN

## Features Included

### netlify.toml
- **Build command:** Installs dependencies
- **Publish directory:** `public/` (your static files)
- **Functions directory:** `netlify/functions/`
- **Security headers:** XSS protection, content-type headers
- **Cache control:** Static assets cached for 1 year
- **Redirects:** Proper routing

### Netlify Functions
- **send-email.js** - Handles form submissions
  - Validates required fields
  - Sends email to business
  - Sends confirmation to customer
  - Escapes HTML to prevent injection
  - Error handling

### Public Website
- HTML/CSS/JS (your existing files)
- Form points to `/.netlify/functions/send-email`
- No changes needed to HTML

## Environment Variables Explained

| Variable | Example | Where to Get |
|----------|---------|--------------|
| EMAIL_SERVICE | gmail | Provider name (gmail, outlook, etc) |
| EMAIL_USER | tracy@gmail.com | Your email address |
| EMAIL_PASSWORD | abcd efgh ijkl mnop | App-specific password from Google |
| BUSINESS_EMAIL | business@gmail.com | Email to receive requests |

## Deployment Status

### First Deploy
- Netlify pulls code from GitHub
- Runs `npm install` (installs nodemailer)
- Builds Netlify Functions
- Deploys to CDN

### Auto-Deploy on Push
Every time you push to GitHub:
1. Netlify automatically triggers a build
2. New code deployed in ~30 seconds
3. Live updates!

### View Logs
1. Netlify Dashboard → Deploys
2. Click latest deploy
3. View build logs
4. Troubleshoot issues

## Testing the Form

### Local Testing (Before Deploy)
```bash
cd /home/tracy/IdeaProjects/Website
npm install
npm start
# Visit http://localhost:3000
```

### Netlify Testing (After Deploy)
1. Visit your Netlify URL
2. Fill out the form
3. Submit
4. Check your email (both business and customer)

## Troubleshooting

### Form Not Sending
- Check Netlify environment variables are set
- Check browser console for errors (F12)
- Verify email/password correct
- Check Netlify Functions logs

### Email Not Received
- Check BUSINESS_EMAIL is set correctly
- Check Gmail app password (not regular password)
- Check spam folder
- Verify EMAIL_USER is correct

### Build Fails
- Check `netlify.toml` exists in root
- Check `package.json` has nodemailer
- Check GitHub push worked
- View build logs in Netlify dashboard

## Custom Domain (Optional)

### Add Your Own Domain
1. Buy domain (GoDaddy, Namecheap, etc)
2. In Netlify: Settings → Domain management
3. Add custom domain
4. Follow Netlify instructions for DNS
5. Netlify provides free HTTPS!

**Example:**
- Before: `https://bha-electrical-llc.netlify.app`
- After: `https://www.bhaelectrical.com`

## Monthly Costs

| Feature | Cost |
|---------|------|
| Website hosting | Free (up to bandwidth limits) |
| Netlify Functions | Free (125k calls/month) |
| Custom domain | $0 (your domain cost) |
| HTTPS | Free (automatic) |
| Email sending | Free (your email provider's cost) |

**Total: FREE for small business!**

## Form Submissions

### Captured By Netlify
Netlify also captures forms natively in:
1. Dashboard → Forms
2. View all submissions
3. Export as CSV
4. Get email notifications

### Email Function Sends
Additionally, your `send-email.js` function sends:
1. Email to your business
2. Confirmation email to customer
3. Structured format
4. Professional templates

## What Happens When Customer Submits Form

```
Customer fills form → Submits → Netlify Function receives
    ↓
Validates data → Sends to Nodemailer → Gmail SMTP
    ↓
Email to business ("New request from John")
Email to customer ("Thanks for your request!")
    ↓
Response back to website → Shows success message
```

## Security Features

✅ HTML entity escaping (prevents injection)  
✅ HTTPS automatically (all traffic encrypted)  
✅ Environment variables (credentials not in code)  
✅ Function authentication (only accepts POST)  
✅ CORS protection via Netlify  
✅ Security headers set  

## Next Steps

1. ✅ Code pushed to GitHub
2. ⏭️ Connect Netlify to GitHub
3. ⏭️ Set environment variables
4. ⏭️ Test form submission
5. ⏭️ (Optional) Add custom domain

**Your website will be live in ~5 minutes!** 🚀

## Support

If you need to:
- **Change email:** Update environment variables
- **Add new fields:** Edit HTML form + function
- **Change styling:** Edit CSS in `public/css/`
- **Update content:** Edit HTML in `public/`

All changes auto-deploy when you push to GitHub!

---

**Questions?** Visit Netlify docs: https://docs.netlify.com/
