FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY prisma ./

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
