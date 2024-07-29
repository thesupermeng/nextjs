FROM node:lts-alpine

# set timezone to GMT+8
RUN apk update
RUN apk add --no-cache tzdata
ENV TZ=Asia/Shanghai

WORKDIR /app

#copy source 
COPY . .

# Install deps 
RUN npm install 

# Build 
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "--max-old-space-size=4096", "node_modules/.bin/next", "start"]