# Build the React application
FROM node:16 as build
WORKDIR /app
COPY package*.json ./

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm install
COPY . .
RUN npm run build

# Serve the application using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
