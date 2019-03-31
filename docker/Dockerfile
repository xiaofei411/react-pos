FROM nginx
COPY . /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
COPY replaceAndRunNginx.sh /usr/bin/replaceAndRunNginx.sh
ENTRYPOINT /usr/bin/replaceAndRunNginx.sh
