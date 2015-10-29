# Using the same as Dialogica for now
FROM node:0.12.7

MAINTAINER Garbrand van der Molen, garbrand.van.der.molen@informaat.nl

# Set the environment
ENV OPS_PATH=/receiver \
  OPS_PORT=8000

# Set the working directory
WORKDIR $OPS_PATH

# Copy the code into the image
# https://docs.docker.com/articles/dockerfile_best-practices/#add-or-copy
ADD . $OPS_PATH

# Install the deps (in WORKDIR)
RUN npm install

# Expose port
EXPOSE $OPS_PORT

# Start the app (in WORKDIR)
CMD ["npm", "start"]


# EXAMPLE USAGE:
# docker build -t receiver .
# docker run -it --rm -p 8000:8000 receiver
#
