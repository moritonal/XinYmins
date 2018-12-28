FROM node:8 as builder

RUN npm install -g parcel

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:latest as http

WORKDIR /usr/app

COPY --from=builder /usr/app/dist /usr/local/apache2/htdocs/