FROM node:26-slim AS build
WORKDIR /app
RUN npm install -g pnpm@10.34.5
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile
COPY . .
RUN NODE_ENV=production pnpm build:all

FROM node:26-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8788 RPG_WORLD=placeholder ALLOW_DEV_COMMANDS=0
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server
COPY --from=build /app/dist-bot ./dist-bot
COPY --from=build /app/third_party ./third_party
COPY --from=build /app/LICENSE ./LICENSE
RUN mkdir -p dist/media && chown -R node:node dist/media
USER node
EXPOSE 8788
CMD ["node", "dist-server/server.cjs"]
