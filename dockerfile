FROM node:lts-alpine

WORKDIR /app/vue/

COPY package*.json ./
RUN  npm install 



COPY .  .

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]



