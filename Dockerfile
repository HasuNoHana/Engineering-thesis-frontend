FROM node:lts as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install -g --unsafe-perm @angular/cli@latest
COPY ./ /app/
ARG configuration=production
# RUN ng build --build-optimizer=true --aot=true --output-hashing=all --named-chunks=false --vendor-chunk=true
RUN ng build

FROM nginx:1.22.1

# Add application files
COPY --from=build-stage /app/dist/common_frontend/ /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

#dodo remove me bo ping nie poczebny
RUN #apt-get update && apt-get install -y iputils-ping

#Expose the port
EXPOSE 80

# STOPSIGNAL SIGTERM
#
CMD ["nginx-debug", "-g","daemon off;"]
