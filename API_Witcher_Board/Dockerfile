FROM node:22-alpine
RUN mkdir -p /home/node/witcher-board-api/node_modules && chown -R node:node /home/node/witcher-board-api
WORKDIR /home/node/witcher-board-api
USER node
COPY --chown=node:node . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
