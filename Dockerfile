FROM node:16.13.2-buster
WORKDIR /opt/app
COPY . .
RUN chown -R 1000:1000 /opt/app
USER 1000
RUN npm install
CMD ["node", "index.js"]
