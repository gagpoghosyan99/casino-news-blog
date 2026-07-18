#!/bin/bash
# Quick refresh on VPS — run ON THE SERVER after: ssh root@95.111.233.120
set -e

APP_DIR="/var/www/casino-news-blog"
APP_PORT=3002
SITE_URL="https://zeonebet.com"
AUTH_DIR="$APP_DIR/data/auth"

cd "$APP_DIR"
git fetch origin
git reset --hard origin/main

sed -i '/^PORT=/d' .env 2>/dev/null || true
sed -i '/^NEXT_PUBLIC_SITE_URL=/d' .env 2>/dev/null || true
[ -f .env ] || cp .env.example .env
echo "PORT=$APP_PORT" >> .env
echo "NEXT_PUBLIC_SITE_URL=$SITE_URL" >> .env

mkdir -p "$AUTH_DIR"
if ! grep -q '^AUTH_DATA_DIR=' .env 2>/dev/null; then
  echo "AUTH_DATA_DIR=$AUTH_DIR" >> .env
elif grep -q '^AUTH_DATA_DIR=$' .env 2>/dev/null; then
  sed -i "s|^AUTH_DATA_DIR=$|AUTH_DATA_DIR=$AUTH_DIR|" .env
fi
if ! grep -q '^AUTH_SECRET=.\+' .env 2>/dev/null; then
  SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('base64'))")
  sed -i '/^AUTH_SECRET=/d' .env 2>/dev/null || true
  echo "AUTH_SECRET=$SECRET" >> .env
fi

npm ci
npm run build

pm2 delete casino-news-blog 2>/dev/null || true
PORT=$APP_PORT pm2 start .next/standalone/server.js --name casino-news-blog
pm2 save

nginx -t && systemctl reload nginx

echo "Done. Local app: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$APP_PORT/)"
echo "Live: $SITE_URL"
echo "Auth note: set SMTP_HOST/SMTP_USER/SMTP_PASS/SMTP_FROM in $APP_DIR/.env for email verification codes."
