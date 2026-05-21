---
vendor: amplitude
llms_txt: https://amplitude.com/llms.txt
last_crawled: 2026-05-21T18:46:00.000Z
count: 2
notes: |
  Amplitude's llms.txt is prose + code blocks (the "wizard / agent primer"),
  not the canonical link-list format the crawler expects. The two files below
  are the actual documentation surface for AI coding agents — fetched directly
  and committed as static mirror content.

  Source: https://claude.com/blog/claude-managed-agents-updates cites
  Amplitude's Design Agent built on Managed Agents + Cloudflare.
---

# Amplitude vendor mirror

| URL | Local path | Bytes |
|---|---|---|
| https://amplitude.com/llms.txt | `amplitude.com/llms.md` | 2774 |
| https://amplitude.com/llms-full.txt | `amplitude.com/llms-full.md` | 18048 |

To refresh:

```bash
curl -sS https://amplitude.com/llms.txt > vendor/amplitude/amplitude.com/llms.md
curl -sS https://amplitude.com/llms-full.txt > vendor/amplitude/amplitude.com/llms-full.md
curl -sS https://amplitude.com/llms.txt > vendor/amplitude/llms.txt
```

`vendor/amplitude/sitemap-llms.txt` (~810 KB curated site index) is NOT mirrored — overwhelmingly marketing pages with no developer-docs subset.
