# Docker Commands Reference - BHA Electrical LLC Website

## Quick Summary

Your website Docker image has been successfully built! 

**Image Details:**
- Name: `bha-electrical:latest`
- Size: ~305MB
- Base: Node.js 18 Alpine Linux
- Port: 3000
- Status: ✅ Ready to run

---

## Running Your Website in Docker

### Method 1: Docker Compose (Recommended) ⭐

The easiest way - runs everything with one command:

```bash
cd /home/tracy/IdeaProjects/Website
docker-compose up --build
```

**What this does:**
- Builds the image (if needed)
- Creates a container
- Loads .env configuration
- Starts the website
- Shows live logs

**Output:**
```
Creating bha-electrical-website ... done
Attaching to bha-electrical-website
bha-electrical-website | Email service is ready to send emails
bha-electrical-website | BHA Electrical LLC website is running on port 3000
```

**Visit:** http://localhost:3000

**To stop:** Press `Ctrl+C` or in another terminal:
```bash
docker-compose down
```

**To run in background:**
```bash
docker-compose up -d
```

**View logs from background:**
```bash
docker-compose logs
docker-compose logs -f  # Follow logs in real-time
```

---

### Method 2: Docker CLI (Full Control)

More manual but gives you more control:

```bash
# Run the container
docker run -d \
  --name bha-electrical-website \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  bha-electrical:latest
```

**Options explained:**
- `-d` = Run in background (detached)
- `--name` = Give container a name
- `-p 3000:3000` = Map port 3000
- `--env-file .env` = Load environment variables
- `--restart unless-stopped` = Auto-restart if it crashes

**View running containers:**
```bash
docker ps
```

**View logs:**
```bash
docker logs bha-electrical-website
docker logs -f bha-electrical-website  # Follow logs
docker logs --tail 50 bha-electrical-website  # Last 50 lines
```

**Stop the container:**
```bash
docker stop bha-electrical-website
```

**Start it again:**
```bash
docker start bha-electrical-website
```

**Remove the container:**
```bash
docker rm bha-electrical-website
```

---

## Docker Compose File Structure

Your `docker-compose.yml` includes:

```yaml
services:
  bha-electrical:
    build: .                 # Build from Dockerfile
    container_name: bha-electrical-website
    ports:
      - "3000:3000"          # Map port 3000
    environment:             # Environment variables
      - NODE_ENV=production
    env_file: .env           # Load from .env file
    restart: unless-stopped  # Auto-restart
    healthcheck: ...         # Monitor container health
```

---

## Common Tasks

### Start the website
```bash
docker-compose up -d
```

### Check if container is running
```bash
docker ps
```

### View live logs
```bash
docker-compose logs -f
```

### Stop the container
```bash
docker-compose stop
```

### Restart the container
```bash
docker-compose restart
```

### Remove everything and start fresh
```bash
docker-compose down
docker-compose up --build
```

### Update code and rebuild
```bash
docker-compose up --build
```

### Access container shell
```bash
docker exec -it bha-electrical-website sh
```

### Check container health
```bash
docker inspect --format='{{json .State.Health}}' bha-electrical-website
```

### View resource usage
```bash
docker stats bha-electrical-website
```

---

## Troubleshooting

### Container won't start?
```bash
docker-compose logs
# or
docker logs bha-electrical-website
```

### Port 3000 already in use?
```bash
# Use different port in docker-compose.yml or CLI:
docker run -p 3001:3000 ...

# Or kill the process using port 3000:
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Email not working in container?
- Check .env file exists and has correct values
- Check container logs: `docker logs bha-electrical-website`
- Verify EMAIL_USER and EMAIL_PASSWORD are set

### Need to rebuild after code changes?
```bash
docker-compose down
docker-compose up --build
```

### Want to see what's in the container?
```bash
docker exec -it bha-electrical-website sh
# Now you're inside the container
ls -la          # List files
cat .env        # View .env file
npm list        # List packages
exit            # Exit shell
```

---

## Docker Compose Commands Summary

| Command | Purpose |
|---------|---------|
| `docker-compose up` | Start container (show logs) |
| `docker-compose up -d` | Start in background |
| `docker-compose up --build` | Build and start |
| `docker-compose down` | Stop and remove |
| `docker-compose restart` | Restart container |
| `docker-compose logs` | View logs |
| `docker-compose logs -f` | Follow logs (real-time) |
| `docker-compose ps` | Show running services |
| `docker-compose exec bha-electrical sh` | Enter container shell |

---

## Docker CLI Commands Summary

| Command | Purpose |
|---------|---------|
| `docker build -t bha-electrical .` | Build image |
| `docker run -d -p 3000:3000 --env-file .env bha-electrical` | Run container |
| `docker ps` | List running containers |
| `docker logs <container>` | View logs |
| `docker stop <container>` | Stop container |
| `docker start <container>` | Start container |
| `docker rm <container>` | Remove container |
| `docker images` | List images |
| `docker rmi bha-electrical` | Remove image |

---

## Environment Variables in Docker

The container automatically loads all variables from `.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
BUSINESS_EMAIL=business-email@gmail.com
PORT=3000
NODE_ENV=production
```

To override a variable when running:
```bash
docker run -e EMAIL_USER=new-email@gmail.com bha-electrical
```

---

## Docker Compose vs Docker CLI

### When to use Docker Compose:
✅ Multiple containers
✅ Complex configuration
✅ Easy to manage
✅ Good for development and production
✅ Version control friendly

### When to use Docker CLI:
✅ Single container
✅ Quick testing
✅ More control
✅ Simple setup

**For this project, Docker Compose is recommended.**

---

## Monitoring Your Container

### Check if healthy:
```bash
docker ps
# Look for "healthy" in STATUS column
```

### View container stats:
```bash
docker stats bha-electrical-website
```

### See detailed info:
```bash
docker inspect bha-electrical-website
```

### View just the IP address:
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' bha-electrical-website
```

---

## Updating and Redeploying

### Update website code:
1. Edit your files locally
2. Rebuild: `docker-compose up --build`
3. Container restarts with new code

### Update .env configuration:
1. Edit `.env` file
2. Restart: `docker-compose restart`
3. Changes take effect

### Check what changed:
```bash
docker-compose logs --tail 20
```

---

## Production Deployment with Docker

### Build for production:
```bash
docker build -t bha-electrical:production .
```

### Push to Docker Hub:
```bash
docker login
docker tag bha-electrical:latest username/bha-electrical:latest
docker push username/bha-electrical:latest
```

### On production server:
```bash
docker pull username/bha-electrical:latest
docker-compose up -d
```

---

## Docker Network (When Using Multiple Containers)

If you add more services (database, cache, etc.):

```bash
# See networks
docker network ls

# Inspect network
docker network inspect bha-electrical_default

# Containers can communicate using service name
# e.g., curl http://bha-electrical:3000
```

---

## Clean Up

### Remove stopped containers:
```bash
docker container prune
```

### Remove unused images:
```bash
docker image prune
```

### Remove unused volumes:
```bash
docker volume prune
```

### Remove everything (careful!):
```bash
docker system prune -a
```

---

## Performance Tips

1. **Use Alpine base image** (already done) ✓
2. **Multi-stage builds** (available if needed)
3. **Layer caching** (Docker automatically optimizes)
4. **Volume for live code updates** (in docker-compose.yml) ✓
5. **Health checks** (automatically configured) ✓

---

## Next Steps

1. ✅ Docker image is built
2. ✅ .env is configured
3. 👉 Start with: `docker-compose up --build`
4. 👉 Visit: http://localhost:3000
5. 👉 Test the form
6. 👉 Check logs: `docker-compose logs`

Your website is ready to run in Docker! 🐳
