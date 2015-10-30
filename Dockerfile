# Using the same as Dialogica for now
FROM node:4.1.2

MAINTAINER Garbrand van der Molen, garbrand.van.der.molen@informaat.nl

# Set the environment
ENV OPS_PATH=/receiver \
  OPS_PORT=8000 \
  NODE_ENV=production

# Set the working directory
WORKDIR $OPS_PATH

# Copy the code into the image
COPY . $OPS_PATH

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
