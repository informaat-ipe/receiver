# Using the same as Dialogica for now
FROM node:0.12.7-wheezy

# Copy the code into the image
COPY . /receiver

# Install the deps
RUN cd /receiver; npm install

# Expose port 8000
EXPOSE 8000

CMD ["node", "/receiver/index.js"]
