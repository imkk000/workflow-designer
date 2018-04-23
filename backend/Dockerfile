FROM justadudewhohacks/opencv-nodejs:node9-opencv3.4.1-contrib

ARG APP_PATH=/app

RUN apt-get update && apt-get -y install cmake g++ git

WORKDIR /tmp
ADD package.json ./
RUN npm install
RUN mkdir -p $APP_PATH && cp -a node_modules $APP_PATH

# cleanup package manager
# RUN apt-get remove --purge -y cmake git
RUN apt-get autoclean && apt-get clean && apt-get -y autoremove
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR $APP_PATH

EXPOSE 1412

CMD ["npm", "run", "dev"]
