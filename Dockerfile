FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9

WORKDIR /app

COPY . .

RUN pnpm install && pnpm run build

ENTRYPOINT ["pnpm","start"]