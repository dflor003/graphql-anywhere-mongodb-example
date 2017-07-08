FROM node:8.1

ADD package.json /opt/app/package.json
WORKDIR /opt/app

RUN npm install --production
ADD . /opt/app

EXPOSE 3000

CMD ["npm", "start"]
