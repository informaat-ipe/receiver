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
RUN npm install --unsafe-perm \
 && npm cache clean

# Expose port
EXPOSE $OPS_PORT

# Start the app (in WORKDIR)
CMD ["npm", "start"]


# EXAMPLE USAGE:
# image_name=ops/receiver
# docker build -t ${image_name} .

# receiver:
#   image: docker-registry.informaat-cxp.com/ops/receiver
#   ports:
#     - '8000:8000'
#   environment:
#     OPS_BASEURL: http://teamcity.informaat.net/app/rest
#     OPS_USER: user
#     OPS_PASS: pass
#     OPS_PORT: 8000
#
# full_version=1.1.0
# docker tag --force ${image_name}:latest docker-registry.informaat-cxp.com/${image_name}:${full_version}
# docker tag --force ${image_name}:latest docker-registry.informaat-cxp.com/${image_name}:latest
# docker push docker-registry.informaat-cxp.com/${image_name}
