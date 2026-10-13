# Build: install everything, turn content/ images into web sizes, bundle the site.
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# Run: just Node, the server, the built site, and the old site's files (old URLs keep working).
FROM node:24-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server ./server
COPY --from=build /app/dist ./dist
COPY --from=build /app/old-site/static ./old-site/static
USER node
EXPOSE 3000
CMD ["node", "server/main.js"]
