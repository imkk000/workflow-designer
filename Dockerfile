FROM justadudewhohacks/opencv-nodejs:node9-opencv3.4.1-contrib

RUN apt-get update && \
  apt-get -y install cmake g++ git

ARG NODE_ENV
ARG APP_PATH

WORKDIR /tmp
ADD backend/package.json ./package.json
RUN npm install
RUN mkdir -p $APP_PATH && cp -a node_modules $APP_PATH

WORKDIR $APP_PATH
RUN mkdir -p upload_files process_files
ADD backend/lib ./lib
ADD backend/package.json ./
ADD frontend/dist ./dist

EXPOSE 1412

CMD ["npm", "start"]
