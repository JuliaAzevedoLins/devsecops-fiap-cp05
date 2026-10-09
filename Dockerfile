# Imagem nginx que roda sem root (porta 8080)
FROM nginxinc/nginx-unprivileged:alpine

COPY site/ /usr/share/nginx/html/

USER nginx
EXPOSE 8080
