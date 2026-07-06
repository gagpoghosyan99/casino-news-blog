# SPF DNS Execution Checklist (P7)

Updated: 2026-07-07  
Reference: [casinopuls-spf-dns-recommendation.md](./casinopuls-spf-dns-recommendation.md)

## Pre-flight

- [ ] **Confirm mail provider** — Google Workspace, Microsoft 365, Zoho, SendGrid, hosting SMTP, etc.
- [ ] List all services that send mail as `@casinopuls.site`
- [ ] Verify DNS panel access (GoDaddy or current registrar)
- [ ] **Do not modify DNS from app server** without registrar credentials

## GoDaddy TXT record steps

1. Log in → **My Products** → **DNS** for `casinopuls.site`
2. Check for existing SPF TXT at `@` (starts with `v=spf1`)
3. If none: **Add** → Type **TXT** → Name `@` → paste SPF value → Save
4. If exists: **Edit** single record — merge includes; never add second SPF TXT
5. TTL: default (1 hour) acceptable

## SPF examples by provider

| Provider | SPF value (single record) |
|----------|---------------------------|
| Google Workspace only | `v=spf1 include:_spf.google.com ~all` |
| Microsoft 365 only | `v=spf1 include:spf.protection.outlook.com ~all` |
| Zoho only | `v=spf1 include:zoho.com ~all` |
| SendGrid only | `v=spf1 include:sendgrid.net ~all` |
| Google + SendGrid | `v=spf1 include:_spf.google.com include:sendgrid.net ~all` |

**Warning:** Use only includes matching your actual outbound senders.

## Validation commands

After propagation (minutes to 48 hours):

```bash
dig TXT casinopuls.site +short
dig TXT _spf.casinopuls.site +short
nslookup -type=TXT casinopuls.site
```

Expected: TXT record starting with `v=spf1`.

Online: Google Admin Toolbox Check MX, mxtoolbox.com SPF lookup.

## DMARC compatibility note

- SPF alone is insufficient for full alignment
- Configure **DKIM** with your mail provider first when possible
- Then add DMARC at `_dmarc.casinopuls.site`:

```text
v=DMARC1; p=none; rua=mailto:dmarc-reports@casinopuls.site
```

Start with `p=none` for monitoring. Replace RUA with a monitored mailbox.

## Rollback

1. GoDaddy DNS → delete or restore previous TXT at `@` containing `v=spf1`
2. Wait for TTL propagation
3. Re-run `dig TXT casinopuls.site +short` to confirm removal

## P7 execution status

| Step | Status |
|------|--------|
| Mail provider confirmed | **Pending — owner action** |
| DNS TXT published | **Not executed** (no credentials on server) |
| Validation run | **Not executed** |
| DMARC | **Not executed** |

## Owner sign-off required

DNS changes require domain registrar access. This checklist is execution-ready documentation only.
