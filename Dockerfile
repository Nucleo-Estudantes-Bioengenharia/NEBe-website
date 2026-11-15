# syntax=docker/dockerfile:1

# ---- Dependências ----
FROM node:22.22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts: não corre scripts de instalação de terceiros (nem o husky).
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts

# ---- Build: gera o site estático em /app/out ----
FROM node:22.22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BASE_PATH=""
ARG NEXT_PUBLIC_SITE_URL="http://localhost:8080"
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Runtime: nginx sem privilégios de root ----
FROM nginxinc/nginx-unprivileged:1.30-alpine AS runtime
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/out /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD ["wget", "-q", "--spider", "http://127.0.0.1:8080/"]
