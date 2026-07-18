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

# Persist auth data outside the standalone build tree
if ! grep -q '^AUTH_DATA_DIR=.\+' .env 2>/dev/null; then
  sed -i '/^AUTH_DATA_DIR=/d' .env 2>/dev/null || true
  echo "AUTH_DATA_DIR=$AUTH_DIR" >> .env
else
  # Force absolute durable path (standalone cwd is not stable across deploys)
  sed -i "s|^AUTH_DATA_DIR=.*|AUTH_DATA_DIR=$AUTH_DIR|" .env
fi

if ! grep -q '^AUTH_SECRET=.\+' .env 2>/dev/null; then
  SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('base64'))")
  sed -i '/^AUTH_SECRET=/d' .env 2>/dev/null || true
  echo "AUTH_SECRET=$SECRET" >> .env
fi

for key in SMTP_HOST SMTP_PORT SMTP_SECURE SMTP_USER SMTP_PASS SMTP_FROM; do
  if ! grep -q "^${key}=" .env 2>/dev/null; then
    case "$key" in
      SMTP_PORT) echo "SMTP_PORT=587" >> .env ;;
      SMTP_SECURE) echo "SMTP_SECURE=false" >> .env ;;
      SMTP_FROM) echo 'SMTP_FROM="ZEONEBET <noreply@zeonebet.com>"' >> .env ;;
      *) echo "${key}=" >> .env ;;
    esac
  fi
done

npm ci
npm run build

# Next standalone loads .env from its own directory
cp -f .env .next/standalone/.env

# If an old store was created under standalone, migrate it once
if [ -f .next/standalone/data/auth/store.json ] && [ ! -f "$AUTH_DIR/store.json" ]; then
  cp .next/standalone/data/auth/store.json "$AUTH_DIR/store.json"
fi

# Export runtime env for PM2 (do not rely only on dotenv)
set -a
# shellcheck disable=SC1091
source "$APP_DIR/.env"
set +a
export AUTH_DATA_DIR="$AUTH_DIR"
export PORT="$APP_PORT"
export NEXT_PUBLIC_SITE_URL="$SITE_URL"

pm2 delete casino-news-blog 2>/dev/null || true
pm2 start "$APP_DIR/.next/standalone/server.js" \
  --name casino-news-blog \
  --cwd "$APP_DIR/.next/standalone"
pm2 save

nginx -t && systemctl reload nginx

echo "Done. Local app: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$APP_PORT/)"
echo "Live: $SITE_URL"
echo "Auth store: $AUTH_DIR"
echo "SMTP configured: $([ -n \"$SMTP_HOST\" ] && [ -n \"$SMTP_USER\" ] && [ -n \"$SMTP_PASS\" ] && echo yes || echo NO — fill SMTP_* in $APP_DIR/.env)"
