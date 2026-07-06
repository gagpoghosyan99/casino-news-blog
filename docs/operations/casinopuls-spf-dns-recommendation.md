# casinopuls.site SPF DNS Recommendation

Updated: 2026-07-07

## Current observation

An external SEO audit reported **no SPF record detected** for the domain `casinopuls.site`. SPF (Sender Policy Framework) helps receiving mail servers verify which hosts are allowed to send email claiming to be from your domain.

**This server does not have verified DNS panel access** — do not apply DNS changes from the application server without confirming control of the domain registrar or DNS host.

## Why SPF matters

- Reduces spoofed email appearing to come from `@casinopuls.site`
- Improves deliverability if you send transactional or editorial email from the domain
- Some SEO/compliance audits flag missing SPF as a trust signal gap

CasinoPulse is primarily a web editorial property. SPF is still recommended if **any** mail is sent from `@casinopuls.site` (contact forms, newsletters, Workspace accounts).

## Recommended approach

1. Identify your **actual outbound mail provider** (Google Workspace, Microsoft 365, Zoho, SendGrid, Mailgun, hosting SMTP, etc.).
2. Use **that provider’s documented SPF include** — not a generic placeholder alone.
3. Publish **one** SPF TXT record at the root domain (`casinopuls.site`).

## Example placeholder (Google Workspace / Gmail sending only)

```text
v=spf1 include:_spf.google.com ~all
```

**Warning:** Use this **only if** Google Workspace or Gmail is the sole authorized sender for `@casinopuls.site`. If you send via another provider, replace the include.

## Other common examples

| Provider | Typical SPF fragment |
|----------|---------------------|
| Microsoft 365 | `include:spf.protection.outlook.com` |
| Zoho | `include:zoho.com` |
| SendGrid | `include:sendgrid.net` |
| Mailgun | `include:mailgun.org` |

Combined example (Google + SendGrid — adjust to your stack):

```text
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

Only one SPF TXT record is allowed. Merge includes into a single record.

## GoDaddy DNS path (if nameservers are GoDaddy)

1. Log in to GoDaddy → **My Products** → **DNS** for `casinopuls.site`
2. **Add** → Type **TXT**
3. Name/Host: `@`
4. Value: your SPF string (e.g. `v=spf1 include:_spf.google.com ~all`)
5. TTL: default (1 hour) is fine
6. Save

If an SPF record already exists, **edit** it rather than adding a second TXT SPF record.

## Validation commands

After DNS propagation (minutes to 48 hours):

```bash
dig TXT casinopuls.site +short
dig TXT _spf.casinopuls.site +short
nslookup -type=TXT casinopuls.site
```

Online: use Google Admin Toolbox Check MX or mxtoolbox.com SPF lookup.

Expected: a TXT record starting with `v=spf1`.

## DMARC (optional follow-up)

After SPF (and ideally DKIM from your mail provider), consider DMARC:

```text
_dmarc.casinopuls.site TXT "v=DMARC1; p=none; rua=mailto:dmarc-reports@casinopuls.site"
```

Replace the reporting address with a real mailbox you monitor. Start with `p=none` for monitoring before quarantine/reject policies.

## Rollback

To remove SPF, delete the TXT record containing `v=spf1` at `@`. Rollback restores previous DNS state; mail deliverability may revert to pre-SPF behavior.

## CasinoPulse action status

- **Documented:** yes (this file)
- **DNS modified from server:** **no** (requires registrar/DNS panel access)
- **Owner next step:** confirm mail provider → publish single SPF TXT → validate with `dig`
