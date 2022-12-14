FROM node:lts

RUN mkdir -p /home/app

COPY    . /home/app

EXPOSE 8080 

CMD ["npm", "run","start:prod"]
