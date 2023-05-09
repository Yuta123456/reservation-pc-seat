FROM node:latest
COPY . /app/
WORKDIR /app
RUN npm i --production
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/db?schema=postgres
RUN npm run docker-build
CMD ["sh", "-c", "npx prisma migrate dev && npx prisma generate && npm run start"]
