# SABOTAGEM 3: imagem base antiga (2020) cheia de CVEs criticos
FROM nginx:1.16-alpine

COPY site/ /usr/share/nginx/html/

USER nginx
EXPOSE 8080
