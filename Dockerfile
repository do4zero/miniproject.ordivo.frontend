# production stage
FROM nginx:stable-alpine as production-stage
COPY /dist /usr/share/nginx/html
COPY micrositemasjid.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]