FROM node

WORKDIR /app

COPY frontend/package.json .

RUN yarn

ENV PORT=$PORT
ENV PROXY_API=$PROXY_API

COPY frontend .

EXPOSE 5173

CMD ["yarn", "dev"]