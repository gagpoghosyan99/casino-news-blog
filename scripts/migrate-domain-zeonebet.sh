#!/bin/bash
# Migrate production from casinopuls.site to zeonebet.com
# Run on VPS as root: bash scripts/migrate-domain-zeonebet.sh
set -e

APP_DIR="/var/www/casino-news-blog"
APP_PORT=3002
DOMAIN="zeonebet.com"
WWW="www.zeonebet.com"
OLD_DOMAIN="casinopuls.site"
OLD_WWW="www.casinopuls.site"
SITE_URL="https://zeonebet.com"
SERVER_IP="95.111.233.120"

export DEBIAN_FRONTEND=noninteractive

apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx dnsutils

cd "$APP_DIR"
git fetch origin
git reset --hard origin/main

sed -i '/^PORT=/d' .env 2>/dev/null || true
sed -i '/^NEXT_PUBLIC_SITE_URL=/d' .env 2>/dev/null || true
[ -f .env ] || cp .env.example .env
echo "PORT=$APP_PORT" >> .env
echo "NEXT_PUBLIC_SITE_URL=$SITE_URL" >> .env

npm ci
npm run build

pm2 delete casino-news-blog 2>/dev/null || true
PORT=$APP_PORT pm2 start .next/standalone/server.js --name casino-news-blog
pm2 save

rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/casino-blog

cat > /etc/nginx/sites-available/zeonebet <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
    }
}
NGINX

cat > /etc/nginx/sites-available/casinopuls-redirect <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $OLD_DOMAIN $OLD_WWW;

    return 301 $SITE_URL\$request_uri;
}
NGINX

ln -sf /etc/nginx/sites-available/zeonebet /etc/nginx/sites-enabled/zeonebet
ln -sf /etc/nginx/sites-available/casinopuls-redirect /etc/nginx/sites-enabled/casinopuls-redirect
rm -f /etc/nginx/sites-enabled/casino-news-blog

nginx -t
systemctl reload nginx

echo "=== DNS check (must be $SERVER_IP for SSL) ==="
echo "$DOMAIN -> $(dig +short $DOMAIN A @8.8.8.8 | tr '\n' ' ')"
echo "$WWW -> $(dig +short $WWW A @8.8.8.8 | tr '\n' ' ')"

CURRENT_IP=$(dig +short "$DOMAIN" A @8.8.8.8 | grep -E '^[0-9.]+$' | head -1)
if [ "$CURRENT_IP" = "$SERVER_IP" ]; then
  certbot --nginx -d "$DOMAIN" -d "$WWW" \
    --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect || true
  certbot --nginx -d "$OLD_DOMAIN" -d "$OLD_WWW" \
    --non-interactive --agree-tos -m "admin@$DOMAIN" --redirect || true
  nginx -t && systemctl reload nginx
  echo "SSL configured for $DOMAIN and redirect for $OLD_DOMAIN"
else
  echo "WARNING: $DOMAIN does not point to $SERVER_IP yet (got: ${CURRENT_IP:-none})"
  echo "Update your domain A records, then run:"
  echo "  certbot --nginx -d $DOMAIN -d $WWW"
  echo "  certbot --nginx -d $OLD_DOMAIN -d $OLD_WWW"
fi

echo "App: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$APP_PORT/)"
echo "Live target: $SITE_URL"
pm2 status
