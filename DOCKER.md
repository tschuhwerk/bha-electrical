# Running BHA Electrical LLC Website in Docker

Your website can now run in a Docker container! This makes it easy to run the same environment anywhere without installing Node.js.

## Prerequisites

- Docker installed (you have it: Docker 29.1.3 ✓)
- Docker Compose (usually comes with Docker)

Check if you have both:
```bash
docker --version
docker-compose --version
```

## Option 1: Using Docker Compose (Easiest) ⭐

### Build and run in one command:

```bash
cd /home/tracy/IdeaProjects/Website
docker-compose up --build
```

This will:
1. Build the Docker image
2. Create a container
3. Start the website
4. Load environment variables from .env

Visit: **http://localhost:3000**

### Stop the container:
```bash
docker-compose down
```

### Run without rebuilding:
```bash
docker-compose up
```

---

## Option 2: Using Docker CLI

### Build the image:
```bash
cd /home/tracy/IdeaProjects/Website
docker build -t bha-electrical:latest .
```

### Run the container:
```bash
docker run -d \
  --name bha-electrical-website \
  -p 3000:3000 \
  --env-file .env \
  bha-electrical:latest
```

### View logs:
```bash
docker logs bha-electrical-website
```

### Stop the container:
```bash
docker stop bha-electrical-website
```

### Start again:
```bash
docker start bha-electrical-website
```

### Remove the container:
```bash
docker rm bha-electrical-website
```

---

## Docker Compose vs Docker CLI

### Docker Compose (Recommended)
✅ Easier to use
✅ One command to run everything
✅ Automatic environment variable loading
✅ Easy to manage multiple containers
✅ Great for production
```bash
docker-compose up --build
```

### Docker CLI
✅ More control
✅ Good for single containers
✅ No extra tool needed
```bash
docker build -t bha-electrical .
docker run -p 3000:3000 --env-file .env bha-electrical
```

---

## Before Running

Make sure your `.env` file is configured with your email settings:

```bash
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
BUSINESS_EMAIL=business-email@gmail.com
```

---

## Docker Files Created

### Dockerfile
- Alpine Linux base image (minimal, ~150MB)
- Node.js 18 runtime
- Installs dependencies
- Exposes port 3000
- Includes health check
- Production ready

### .dockerignore
- Excludes unnecessary files
- Reduces image size
- Faster build times

### docker-compose.yml
- Defines services and configuration
- Maps port 3000
- Loads .env file
- Sets up volumes for live code updates
- Auto-restart on failure
- Includes health check

---

## Image Size

The Docker image will be approximately:
- Base Alpine image: ~40MB
- Node.js: ~40MB
- npm dependencies: ~100-150MB
- **Total: ~200-250MB** (very small!)

This is much smaller than a full Linux distribution.

---

## Useful Docker Commands

### List running containers:
```bash
docker ps
```

### List all containers:
```bash
docker ps -a
```

### List images:
```bash
docker images
```

### View container logs:
```bash
docker logs bha-electrical-website
```

### Execute command in running container:
```bash
docker exec -it bha-electrical-website sh
```

### Remove unused images:
```bash
docker image prune
```

---

## Updating the Website

### With Docker Compose:
1. Update your files (HTML, CSS, JS)
2. Rebuild: `docker-compose up --build`
3. The new version loads automatically

### With Docker CLI:
1. Stop container: `docker stop bha-electrical-website`
2. Rebuild image: `docker build -t bha-electrical:latest .`
3. Run new version: `docker run -d -p 3000:3000 --env-file .env bha-electrical:latest`

---

## Environment Variables

The container loads all variables from your `.env` file:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
BUSINESS_EMAIL=business-email@gmail.com
PORT=3000
NODE_ENV=production
```

To use different values per environment, create separate .env files:
- `.env` - Production
- `.env.dev` - Development
- `.env.test` - Testing

---

## Health Check

The container includes a health check that:
- Pings `/health` endpoint every 30 seconds
- Automatically restarts if unhealthy
- Shows status in Docker: `docker ps`

Check status:
```bash
docker inspect --format='{{json .State.Health}}' bha-electrical-website
```

---

## Networking

The container is accessible at:
- **Local**: http://localhost:3000
- **From other containers**: http://bha-electrical:3000 (when using Docker Compose)

---

## Production Deployment

When deploying to a server:

### Push to Docker Hub:
```bash
# Login
docker login

# Tag image
docker tag bha-electrical:latest your-username/bha-electrical:latest

# Push
docker push your-username/bha-electrical:latest
```

### On production server:
```bash
docker pull your-username/bha-electrical:latest
docker-compose up -d
```

---

## Troubleshooting

### Container won't start?
```bash
docker logs bha-electrical-website
```

### Port 3000 already in use?
```bash
# Use different port
docker run -p 3001:3000 --env-file .env bha-electrical:latest
```

### Need to rebuild after code changes?
```bash
docker-compose up --build
```

### Container keeps restarting?
```bash
# Check logs
docker logs --tail 50 bha-electrical-website

# Stop automatic restart
docker update --restart=no bha-electrical-website
```

### Want to access container shell?
```bash
docker exec -it bha-electrical-website sh
```

---

## Summary

| Task | Command |
|------|---------|
| Build & Run | `docker-compose up --build` |
| Stop | `docker-compose down` |
| View logs | `docker-compose logs` |
| Run background | `docker-compose up -d` |
| Rebuild | `docker-compose up --build -d` |
| Remove everything | `docker-compose down -v` |

---

## Next Steps

1. Ensure `.env` is configured
2. Run: `docker-compose up --build`
3. Visit: http://localhost:3000
4. Test the form
5. Check logs: `docker logs bha-electrical-website`

Your website is now containerized and production-ready! 🎉
