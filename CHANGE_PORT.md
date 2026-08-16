# Changing the Port for BHA Electrical LLC Website

## ✅ YES! The port can easily be changed from 3000 to any other port.

---

## Quick Reference: Change Port to 8080

### Option 1: Docker Compose (Easiest) ⭐

**Edit:** `docker-compose.yml`

Change line 10 from:
```yaml
    ports:
      - "3000:3000"
```

To:
```yaml
    ports:
      - "8080:3000"
```

Change line 13 from:
```yaml
      - PORT=3000
```

To:
```yaml
      - PORT=8080
```

Then run:
```bash
docker-compose up --build
```

Visit: `http://localhost:8080`

---

### Option 2: Environment Variable (No file editing)

When running Docker, pass the port as an environment variable:

```bash
docker-compose up --build -e PORT=8080
```

Or create a `.env` file in the project root:
```
PORT=8080
```

Then run:
```bash
docker-compose up --build
```

---

### Option 3: Docker CLI (Advanced)

```bash
docker run -d \
  --name bha-electrical-website \
  -p 8080:3000 \
  -e PORT=8080 \
  --env-file .env \
  --restart unless-stopped \
  bha-electrical:latest
```

Visit: `http://localhost:8080`

---

### Option 4: Non-Docker (npm start)

**Edit:** `docker-compose.yml` or `.env` file

Add this line:
```
PORT=8080
```

Then run:
```bash
npm start
```

Visit: `http://localhost:8080`

---

## Common Ports to Use

| Port | Usage | Status |
|------|-------|--------|
| 3000 | Default Node.js | ❌ In use |
| 8000 | Common alternative | ✅ Try this |
| 8080 | Web proxy/alternative HTTP | ✅ Try this |
| 8888 | Common development | ✅ Try this |
| 5000 | Flask default | ⚠️ Check availability |
| 9000 | Alternative | ✅ Try this |

---

## Check Which Port is Available

### Linux/Mac:
```bash
# Check if port is in use
lsof -i :8080

# Find what's using port 3000
lsof -i :3000

# List all ports in use
netstat -tuln | grep LISTEN
```

### Windows:
```bash
# Check if port is in use
netstat -ano | findstr :8080
```

---

## How It Works

The website port configuration has two layers:

1. **Container Internal Port (3000)**
   - The Node.js server inside Docker always runs on 3000
   - This never changes

2. **Host External Port (8080)**
   - The port your computer uses to access it
   - This is what YOU change
   - Maps to the container's port 3000

**Mapping:** `Host Port : Container Port`
```
8080:3000
↑    ↑
|    └─ Container runs on this (never changes)
└────── Your computer accesses on this (you change this)
```

---

## Examples

### Change to port 8000
```yaml
ports:
  - "8000:3000"
```
Visit: `http://localhost:8000`

### Change to port 8888
```yaml
ports:
  - "8888:3000"
```
Visit: `http://localhost:8888`

### Change to port 5000
```yaml
ports:
  - "5000:3000"
```
Visit: `http://localhost:5000`

---

## Step-by-Step Guide: Change to Port 8080

### Step 1: Edit docker-compose.yml
```bash
nano docker-compose.yml
# or use your favorite editor
```

### Step 2: Find the ports section (around line 10)
```yaml
ports:
  - "3000:3000"
```

### Step 3: Change to your desired port
```yaml
ports:
  - "8080:3000"
```

### Step 4: Also update the PORT environment variable (around line 13)
```yaml
- PORT=8080
```

### Step 5: Save and exit
Press Ctrl+X, then Y, then Enter (if using nano)

### Step 6: Rebuild and run
```bash
docker-compose up --build
```

### Step 7: Visit your website
`http://localhost:8080`

---

## Multiple Instances on Different Ports

Want to run multiple copies of the website? No problem!

```bash
# First instance on port 8000
docker-compose -f docker-compose.yml up -d

# Then create a copy with different port
docker run -d \
  --name bha-electrical-2 \
  -p 8080:3000 \
  -e PORT=8080 \
  --env-file .env \
  bha-electrical:latest
```

Now you have:
- `http://localhost:3000` - Instance 1
- `http://localhost:8080` - Instance 2

---

## Troubleshooting

### Error: "Address already in use"
**Solution:** The port is in use. Try a different port.

Check what's using it:
```bash
lsof -i :3000
# Kill the process using it, or use a different port
```

### Can't connect to website after port change
**Solution:** Make sure you're visiting the new port in your browser.

- Old: `http://localhost:3000`
- New: `http://localhost:8080`

### Docker says port is in use
**Solution:** Stop existing container first.
```bash
docker-compose down
# Then start again with new port
docker-compose up --build
```

---

## Summary

| Method | Difficulty | When to Use |
|--------|-----------|------------|
| Edit docker-compose.yml | Easy | Permanent change |
| Environment variable | Medium | Flexible, scriptable |
| Docker CLI | Hard | Advanced users |
| npm start | Easy | Non-Docker running |

---

## Recommended Port Selection

✅ **Best options (least likely to conflict):**
- 8000
- 8080
- 8888
- 9000

⚠️ **Avoid:**
- 22 (SSH)
- 80 (HTTP - requires admin)
- 443 (HTTPS - requires admin)
- 3000-3005 (commonly used)

---

## All-in-One Command to Change Port

To quickly change from 3000 to 8080:

```bash
cd /home/tracy/IdeaProjects/Website
sed -i 's/"3000:3000"/"8080:3000"/' docker-compose.yml
sed -i 's/- PORT=3000/- PORT=8080/' docker-compose.yml
docker-compose up --build
```

Then visit: `http://localhost:8080`

---

That's it! Your website can run on any port you choose. 🚀
