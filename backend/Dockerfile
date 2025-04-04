# Use official Node.js image as a base image
FROM node:16-alpine

# Set the working directory for the backend code
WORKDIR /usr/src/app

# Copy the backend code into the container
COPY ./backend /usr/src/app

# Install dependencies (assuming you have a package.json)
RUN npm install

# Expose port for the backend (e.g., 3000 for a Node.js app)
EXPOSE 3000

# Command to start the backend service
CMD ["npm", "start"]
