FROM ubuntu:latest
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 3000

CMD ["npm", "run"]