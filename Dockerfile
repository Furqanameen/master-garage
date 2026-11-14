# Production image: builds the React app, then runs Express which serves it.
FROM node:22-alpine AS build
WORKDIR /app
COPY client/package*.json client/
RUN npm --prefix client install
COPY client client
RUN npm --prefix client run build

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY server/package*.json server/
RUN npm --prefix server install --omit=dev
COPY server server
COPY --from=build /app/client/dist client/dist
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:4000/healthz || exit 1
CMD ["node", "server/src/index.js"]
