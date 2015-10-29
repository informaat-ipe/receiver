# Using the same as Dialogica for now
FROM node:0.12.7-wheezy


# Set the environment
ENV OPS_PATH /receiver
ENV OPS_PORT 8000

# Set the working directory
WORKDIR $OPS_PATH

# Copy the code into the image
COPY . $OPS_PATH

# Install the deps (in WORKDIR)
RUN npm install

# Expose port 8000
EXPOSE $OPS_PORT

# Start the app (in WORKDIR)
CMD ["npm", "start"]
