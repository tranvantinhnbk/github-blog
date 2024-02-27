# Stage 1: Build the Angular application
FROM node:hydrogen-slim as angular
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Serve the application from Apache
FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs/
COPY --from=angular /app/dist/github-blog .

# Enable .htaccess files and mod_rewrite
RUN sed -i 's#AllowOverride None#AllowOverride All#' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/' /usr/local/apache2/conf/httpd.conf

# Add .htaccess file
COPY .htaccess /usr/local/apache2/htdocs/