FROM node:latest
WORKDIR /app
COPY ./package*.json ./
COPY ./.next ./.next
RUN npm i --production
