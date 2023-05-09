FROM node:latest
COPY . /app/
WORKDIR /app
RUN npm i --production
RUN npm run docker-build
CMD ["npm", "run", "start"]