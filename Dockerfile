FROM node:20-alpine

# Install http-server and esbuild (bundler)
RUN npm install -g http-server esbuild

WORKDIR /app

# Copy project files
COPY . .

# Bundle app.js into browser-compatible code
RUN esbuild src/app.js \
    --bundle \
    --outfile=/webroot/app.bundle.js \
    --platform=browser \
    --minify

# Copy static files
RUN mkdir -p /webroot && \
    cp -r src/* /webroot/ && \
    cp -r lib /webroot/ && \
    rm -f /webroot/app.js  # Don't use the unbundled version

WORKDIR /webroot

EXPOSE 8080
CMD ["http-server", ".", "-p", "8080", "-c-1"]

