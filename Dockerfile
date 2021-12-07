FROM node:10
WORKDIR /home/node/app
COPY rest-file /home/node/app
RUN npm install
CMD npm run start 
EXPOSE 3000