FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma

RUN npm install
RUN npx auth secret
RUN npm run db:generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
