FROM nginx:stable-alpine
COPY dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]