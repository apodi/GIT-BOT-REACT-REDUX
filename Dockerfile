FROM node:14.17-alpine
RUN echo "Installing Dependencies" && \
  apk --no-cache add  g++=9.3.0-r0  \
  gcc=9.3.0-r0 \
  make=4.2.1-r2 \
  python=2.7.18-r0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html