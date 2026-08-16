# Deploy BHA Electrical LLC to the Internet

## Quick Option: Heroku (Easiest - Free Tier Available)

### Prerequisites
- Heroku account (free at heroku.com)
- Heroku CLI installed
- Git installed

### Step-by-Step Deployment

#### Step 1: Install Heroku CLI
```bash
curl https://cli.heroku.com/install.sh | sh
```

#### Step 2: Login to Heroku
```bash
heroku login
```
Opens browser to authenticate

#### Step 3: Initialize Git (if not already done)
```bash
cd /home/tracy/IdeaProjects/Website
git init
git add .
git commit -m "Initial commit"
```

#### Step 4: Create Heroku App
```bash
heroku create bha-electrical-llc
```
Creates your app and adds remote

#### Step 5: Set Environment Variables
```bash
heroku config:set EMAIL_SERVICE=gmail
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set BUSINESS_EMAIL=business@gmail.com
```

#### Step 6: Deploy
```bash
git push heroku main
```

#### Step 7: View Your Website
```bash
heroku open
```
Or visit: `https://bha-electrical-llc.herokuapp.com`

#### Step 8: View Logs
```bash
heroku logs --tail
```

### Your Website is Live!
**URL:** `https://bha-electrical-llc.herokuapp.com`
**Accessible from:** Anywhere in the world!

---

## Alternative Option: DigitalOcean ($5/month)

### Step 1: Create Account
Visit: digitalocean.com

### Step 2: Create Droplet
- OS: Ubuntu 22.04
- Size: $5/month basic
- Region: Choose nearest

### Step 3: SSH into Droplet
```bash
ssh root@YOUR_DROPLET_IP
```

### Step 4: Install Docker
```bash
apt update
apt install docker.io docker-compose -y
usermod -aG docker root
```

### Step 5: Clone Your Repository
```bash
git clone https://github.com/YOUR_USERNAME/Website.git
cd Website
```

### Step 6: Create .env File
```bash
nano .env
```
Add:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
BUSINESS_EMAIL=business@gmail.com
HOST_PORT=80
```

### Step 7: Start Docker
```bash
docker-compose up -d
```

### Step 8: Get Domain (Optional)
- Buy domain at GoDaddy, Namecheap, etc.
- Point DNS to your droplet's IP
- Result: `http://your-domain.com`

---

## Option 3: Using ngrok for Quick Testing

### Install ngrok
```bash
# Download from ngrok.com or
brew install ngrok  # macOS
sudo apt install ngrok  # Linux
```

### Create ngrok Account
Visit: ngrok.com and sign up

### Get Auth Token
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Start Your Website Locally
```bash
cd /home/tracy/IdeaProjects/Website
docker-compose up --build
```

### In Another Terminal, Start ngrok
```bash
ngrok http 3000
```

### Get Public URL
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

Visit: `https://abc123.ngrok.io`

**Note:** URL changes on restart. Get premium to keep same URL.

---

## Comparison Table

| Option | Cost | Setup Time | Uptime | Speed | Best For |
|--------|------|-----------|--------|-------|----------|
| Heroku | Free/Paid | 10 mins | 99.9% | Fast | Quick deployment |
| DigitalOcean | $5+/month | 30 mins | 99.9% | Fast | More control |
| AWS | Free tier | 30 mins | 99.99% | Fast | Enterprise |
| ngrok | Free/Paid | 5 mins | 99% | Medium | Testing only |
| Port Forward | Free | 20 mins | Variable | Slow | Not recommended |

---

## Making It Professional

### Add Custom Domain

#### With Heroku
```bash
heroku domains:add www.your-domain.com
```
Then point domain DNS to Heroku

#### With DigitalOcean
1. Buy domain
2. Update DNS to point to droplet IP
3. Set up SSL certificate (included)

#### Result
`https://www.your-domain.com` (professional!)

---

## Monitoring & Maintenance

### Heroku
```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# View all apps
heroku apps

# Delete app
heroku apps:destroy
```

### DigitalOcean
```bash
# View Docker logs
docker logs bha-electrical-website

# Restart container
docker restart bha-electrical-website

# Update code
git pull
docker-compose up -d --build
```

---

## Security Checklist

- [ ] Use HTTPS (cloud provides this)
- [ ] Rotate email password regularly
- [ ] Keep `.env` private
- [ ] Enable firewall
- [ ] Use strong database passwords
- [ ] Keep Docker images updated
- [ ] Monitor logs for errors
- [ ] Set up backups

---

## Cost Comparison

| Option | Monthly Cost | Notes |
|--------|-------------|-------|
| Heroku Free | $0 | Limited, may sleep |
| Heroku Hobby | $7 | Always running |
| DigitalOcean | $5+ | Full VPS control |
| AWS Free Tier | $0 (1 year) | Complex, powerful |
| Google Cloud | $0 (free tier) | Always on free tier |
| Azure | $0 (free tier) | Always on free tier |

---

## Recommended Path

### For Small Business
1. Start with **local network** (192.168.1.62:3000)
2. Test for a week
3. Deploy to **Heroku** (free or $7/month)
4. Add custom domain later

### For Production
1. Deploy to **DigitalOcean** or **AWS**
2. Set up domain
3. Enable HTTPS
4. Monitor 24/7

### For Quick Demo
1. Use **ngrok** for instant public URL
2. Good for showing customers
3. No setup time

---

## FAQ

**Q: Can I keep my computer on 24/7 with port forwarding?**
A: Yes, but not recommended. Cloud is better.

**Q: How much does it cost?**
A: Heroku free tier, or DigitalOcean at $5/month minimum.

**Q: Can I use my own domain?**
A: Yes, with Heroku, DigitalOcean, or any cloud provider.

**Q: Is it secure?**
A: Yes if you use cloud providers with HTTPS. Port forwarding is risky.

**Q: Can customers book services online?**
A: Yes! They can submit the form from anywhere with your public URL.

**Q: What if my internet goes down?**
A: Cloud providers stay up. Port forwarding stops working.

---

Your website can be deployed and accessible from anywhere! 🌍
