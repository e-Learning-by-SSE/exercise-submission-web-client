FROM node:19-bullseye
WORKDIR /app
COPY ./build/ .
RUN npm install -g serve
CMD [ "serve" ,"-s"]
EXPOSE 3000
