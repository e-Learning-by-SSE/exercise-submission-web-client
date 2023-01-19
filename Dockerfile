FROM node:19-bullseye
WORKDIR /app
COPY ./build/ .
RUN npm install -g serve
ENTRYPOINT npx react-inject-env set -d ./ && serve -s
EXPOSE 3000
