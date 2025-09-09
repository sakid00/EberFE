# Docker Setup for EberFE

This document explains how to build and run the EberFE Next.js application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## Files Created

- `Dockerfile` - Production-optimized multi-stage build
- `Dockerfile.dev` - Development Dockerfile with hot reload
- `docker-compose.yml` - Docker Compose configuration for different environments
- `.dockerignore` - Files to exclude from Docker build context
- `env.example` - Environment variables template

## Quick Start

### Development Mode

Run the application in development mode with hot reload:

```bash
# Using Docker Compose (recommended)
docker-compose --profile dev up --build

# Or using Docker directly
docker build -f Dockerfile.dev -t eber-fe-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules eber-fe-dev
```

The application will be available at `http://localhost:3000`

### Production Mode

Build and run the production version:

```bash
# Using Docker Compose
docker-compose --profile prod up --build

# Or using Docker directly
docker build -t eber-fe-prod .
docker run -p 3000:3000 eber-fe-prod
```

## Environment Variables

1. Copy the environment template:

   ```bash
   cp env.example .env.local
   ```

2. Update the values in `.env.local`:
   ```bash
   NEXT_PUBLIC_IMAGE_BASE_URL=https://your-api-domain.com
   NEXT_PUBLIC_API_URL=https://eber-api.agepedia.info
   ```

## Docker Commands

### Build Commands

```bash
# Build production image
docker build -t eber-fe .

# Build development image
docker build -f Dockerfile.dev -t eber-fe-dev .

# Build with no cache
docker build --no-cache -t eber-fe .
```

### Run Commands

```bash
# Run production container
docker run -p 3000:3000 eber-fe

# Run development container with volume mounting
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules eber-fe-dev

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production eber-fe
```

### Docker Compose Commands

```bash
# Development
docker-compose --profile dev up --build

# Production
docker-compose --profile prod up --build

# Run in background
docker-compose --profile prod up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose --profile dev up --build --force-recreate
```

## Production Deployment

For production deployment, consider:

1. **Using a reverse proxy** (nginx) for better performance
2. **Setting up SSL/TLS** certificates
3. **Using environment-specific configurations**
4. **Implementing health checks**
5. **Setting up monitoring and logging**

### Example with Nginx

```bash
# Run with nginx profile
docker-compose --profile nginx up --build
```

## Troubleshooting

### Common Issues

1. **Port already in use**:

   ```bash
   # Change port in docker-compose.yml or kill existing process
   lsof -ti:3000 | xargs kill -9
   ```

2. **Permission issues on Linux**:

   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Node modules not found**:

   ```bash
   # Rebuild with no cache
   docker-compose --profile dev up --build --force-recreate
   ```

4. **Environment variables not loading**:
   - Ensure `.env.local` exists and has correct values
   - Check that environment variables are prefixed with `NEXT_PUBLIC_` for client-side access

### Debugging

```bash
# Access container shell
docker exec -it <container_id> sh

# View container logs
docker logs <container_id>

# Check container status
docker ps -a
```

## Performance Optimization

The production Dockerfile includes several optimizations:

- **Multi-stage build** to reduce final image size
- **Standalone output** for minimal runtime dependencies
- **Non-root user** for security
- **Layer caching** for faster rebuilds
- **Alpine Linux** for smaller base image

## Security Considerations

- The production container runs as a non-root user (`nextjs`)
- Only necessary files are copied to the final image
- Development dependencies are excluded from production build
- Environment variables should be properly secured in production

## Next Steps

1. Set up your environment variables
2. Test the development setup
3. Build and test the production image
4. Configure your deployment pipeline
5. Set up monitoring and logging for production
