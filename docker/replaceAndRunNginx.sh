echo "Using assembly version: ${ASSEMBLY_VERSION}"
sed -i "s/__DOCKER_REPLACE_ASSEMBLY_VERSION__/${ASSEMBLY_VERSION}/" /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"
