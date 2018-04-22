FROM justadudewhohacks/opencv-nodejs:node9-opencv3.4.1-contrib

RUN apt-get update && apt-get -y install cmake g++ git

ARG NODE_ENV
ARG APP_PATH

WORKDIR /tmp
ADD backend/package.json ./package.json
RUN npm install
RUN mkdir -p $APP_PATH && cp -a node_modules $APP_PATH

# cleanup package manager
RUN apt-get remove --purge -y cmake git
RUN apt-get autoclean && apt-get clean && apt-get -y autoremove
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN rm -rf ~

WORKDIR $APP_PATH
ADD backend/* ./
ADD frontend/dist ./dist

EXPOSE 1412

CMD ["node", "app.js"]
