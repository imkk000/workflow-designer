FROM justadudewhohacks/opencv-nodejs:node9-opencv3.4.1-contrib

RUN apt update && apt -y install cmake g++ gcc git

ARG NODE_ENV
ARG APP_PATH

WORKDIR /tmp
ADD backend/package.json ./package.json
RUN npm install
RUN mkdir -p $APP_PATH && cp -a node_modules $APP_PATH

WORKDIR $APP_PATH
ADD backend/* ./
ADD frontend/dist ./dist

EXPOSE 5665

CMD ["node", "index.js"]
