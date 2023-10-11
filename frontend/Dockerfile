FROM node

WORKDIR /app

COPY frontend/package.json .

ENV PORT=$PORT
ENV PROXY_API=$PROXY_API

COPY frontend .

RUN yarn build

EXPOSE $PORT

CMD ["yarn", "preview"]