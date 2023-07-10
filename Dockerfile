# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and the lock file for use in the image
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy already built JavaScript code
COPY built/src ./

# Expose port 3000 for the app to be served
EXPOSE 3000

# Define the command to start the app
CMD [ "node", "index.js" ]
