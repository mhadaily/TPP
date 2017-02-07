FROM node:7.4.0

RUN useradd --user-group --create-home --shell /bin/false tpp && \
    apt-get clean

ENV HOME=/home/tpp

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY . $HOME/app

RUN chown -R tpp:tpp $HOME/* /usr/local/

WORKDIR $HOME/app

RUN npm install nodemon --global --silent --progress=false --production
RUN npm install sails --global --silent --progress=false --production

RUN npm cache clean && npm install --silent --progress=false --production

RUN chown -R tpp:tpp $HOME/*

USER tpp

ENV NODE_ENV=development
ENV PORT=1337

EXPOSE 1337

CMD ["sails", "lift"]
