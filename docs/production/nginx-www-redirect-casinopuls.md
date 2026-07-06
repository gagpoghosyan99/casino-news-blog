# Nginx WWW → Non-WWW Redirect — casinopuls.site

Host-level configuration applied **outside git** during the Semrush cleanup sprint (July 2026). Documented here for production traceability.

## Server block path

```text
/etc/nginx/sites-available/casino-news-blog
/etc/nginx/sites-enabled/casino-news-blog  → symlink
```

## Backup path

Before editing, copy the active config:

```bash
sudo cp /etc/nginx/sites-available/casino-news-blog \
  /etc/nginx/sites-available/casino-news-blog.bak.$(date +%Y%m%d)
```

## Exact redirect behavior

| Request | Response |
|---------|----------|
| `http://www.casinopuls.site/*` | `301` → `https://casinopuls.site/*` |
| `http://casinopuls.site/*` | `301` → `https://casinopuls.site/*` |
| `https://www.casinopuls.site/*` | `301` → `https://casinopuls.site/*` (one hop) |
| `https://casinopuls.site/*` | `200` proxied to Next.js on `127.0.0.1:3002` |

HTTPS www block (dedicated server):

```nginx
server {
    server_name www.casinopuls.site;
    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/casinopuls.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/casinopuls.site/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    return 301 https://casinopuls.site$request_uri;
}
```

Canonical app origin remains `https://casinopuls.site` (see `src/config/site.ts`).

## curl proof

```bash
curl -I https://www.casinopuls.site/
# HTTP/2 301
# location: https://casinopuls.site/

curl -I https://www.casinopuls.site/blogs/review-stake
# HTTP/2 301
# location: https://casinopuls.site/blogs/review-stake

curl -I https://casinopuls.site/
# HTTP/2 200
```

Verified: **2026-07-06**

## Reload command used

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Rollback instructions

1. Restore backup:

   ```bash
   sudo cp /etc/nginx/sites-available/casino-news-blog.bak.YYYYMMDD \
     /etc/nginx/sites-available/casino-news-blog
   ```

2. Test and reload:

   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

3. Confirm www behavior matches pre-change expectations.

**Note:** Rolling back is **not recommended** — www duplicates were causing Semrush/GSC crawl waste. Canonical policy is non-www only.
