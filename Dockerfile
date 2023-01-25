# pull official base image
FROM node:16.13.2-stretch AS test

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

# add app
ADD src/ src
ADD public/ public

RUN npm install --global yarn --force

WORKDIR /app
RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]
