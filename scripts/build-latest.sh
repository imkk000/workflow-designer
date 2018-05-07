# env
APP_PATH=/app

# build frontend
cd frontend && \
npm run build && \
cd ..

# build backend
cd backend && \
npm run build && \
cd ..

# start to build image
docker build \
  --build-arg NODE_ENV=production \
  --build-arg APP_PATH=$APP_PATH \
  -t anonyfz/workflow-designer:latest .
