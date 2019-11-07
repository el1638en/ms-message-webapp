FROM nginx:1.17

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy dist to nginx website
COPY /dist/ms-message-webapp/ /usr/share/nginx/html