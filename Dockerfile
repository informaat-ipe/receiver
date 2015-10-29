# Using the same as Dialogica for now
FROM node:0.12.7

MAINTAINER Garbrand van der Molen, garbrand.van.der.molen@informaat.nl

# Copy the code into the image
# https://docs.docker.com/articles/dockerfile_best-practices/#add-or-copy
ADD . /receiver

WORKDIR /receiver

# Install the deps
RUN npm install

# Expose port 8000
EXPOSE 8000

CMD ["node", "index.js"]
