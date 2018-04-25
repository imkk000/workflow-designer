# env
NODE_ENV=$1
APP_PATH=/app

# build frontend
cd frontend
yarn build
cd ..

# build backend
cd backend
yarn build
cd ..

# build images
TAG=$NODE_ENV
if [ "$NODE_ENV" = "production" ]; then
  TAG="latest"
fi

docker build \
  --build-arg NODE_ENV=$NODE_ENV \
  --build-arg APP_PATH=$APP_PATH \
  -t anonyfz/workflow-designer:$TAG .
