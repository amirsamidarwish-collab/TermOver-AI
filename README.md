<div align="center">

# TermOver AI

**AI-powered Chrome extension that analyzes Terms of Service & Privacy Policies in real-time**

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/gjnoffbiofloekaileonocagbffikknh)
[![Patent Granted](https://img.shields.io/badge/Patent-Granted-22c55e?style=for-the-badge)](#)
[![Google Certified Publisher](https://img.shields.io/badge/Google-Certified_Publisher-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)
[![AWS Founders Club](https://img.shields.io/badge/AWS-Founders_Club-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](#)
[![NVIDIA Inception](https://img.shields.io/badge/NVIDIA-Inception_Program-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](#)

**3,000+ Installs &nbsp;|&nbsp; 1,000+ Downloads &nbsp;|&nbsp; 20+ Languages &nbsp;|&nbsp; < 20 Second Scans**

</div>

---

## What is TermOver AI?

Nobody reads Terms of Service. TermOver AI does it for them.

It's a Chrome extension that automatically detects, extracts, and analyzes the Terms of Service and Privacy Policy of any website you visit — then delivers a clear, actionable risk report in seconds. No legal background required.

**The problem it solves:** The average ToS document is 8,000+ words. Users click "I Agree" without reading anything. TermOver AI bridges that gap by flagging the clauses that actually matter — data selling, auto-renewals, arbitration waivers, content ownership grabs, and more.

---

## Key Features

- 🔍 **Real-time detection** — automatically identifies ToS/PP documents on any website
- ⚡ **Fast analysis** — full scan completes in under 20 seconds (optimized from an original 4+ minute baseline)
- 🗄️ **Smart caching** — results are cached in Supabase + AWS so returning users get instant results with no re-scan
- 🌍 **20+ languages** — Arabic, Hebrew, English, German, French, Spanish, and more
- 🏭 **Industry-aware scoring** — risk thresholds calibrated per industry (streaming, SaaS, e-commerce, etc.)
- 🚩 **Actionable risk flags** — highlights dangerous clauses with plain-language explanations
- 🔒 **Privacy-first** — no user data stored or transmitted beyond what's needed for analysis

---

## Architecture Overview

> ⚠️ This repository showcases architecture and selected snippets. Full source is proprietary and protected under a granted patent.

TermOver AI is built on a **multi-backend, parallel processing architecture** with four autonomous Cloudflare Workers handling different stages of the pipeline:

```
┌─────────────────────────────────────────────────┐
│               Chrome Extension                  │
│                                                 │
│  ┌─────────────┐     ┌──────────────────────┐   │
│  │ Content     │────▶│ Background Service   │   │
│  │ Script      │     │ Worker               │   │
│  │ (Detection &│     │ (Orchestration)      │   │
│  │ Extraction) │     └──────────┬───────────┘   │
│  └─────────────┘                │               │
│                                 ▼               │
│            ┌────────────────────────────────┐   │
│            │         Popup UI               │   │
│            │     (Risk Report Display)      │   │
│            └────────────────────────────────┘   │
└─────────────────────┬───────────────────────────┘
                      │ HTTPS
        ┌─────────────▼──────────────────────┐
        │        Cloudflare Workers           │
        │      (4 autonomous backends)        │
        │                                     │
        │  ┌──────────────────────────────┐   │
        │  │  1. Chunking Worker          │   │
        │  │  Splits large docs into      │   │
        │  │  parallel-processable chunks │   │
        │  └──────────────┬───────────────┘   │
        │                 │                   │
        │  ┌──────────────▼───────────────┐   │
        │  │  2. Analysis Worker          │   │
        │  │  AI clause detection &       │   │
        │  │  risk classification         │   │
        │  └──────────────┬───────────────┘   │
        │                 │                   │
        │  ┌──────────────▼───────────────┐   │
        │  │  3. Scoring Worker           │   │
        │  │  Industry-aware              │   │
        │  │  risk scoring engine         │   │
        │  └──────────────┬───────────────┘   │
        │                 │                   │
        │  ┌──────────────▼───────────────┐   │
        │  │  4. Email Campaign Worker    │   │
        │  │  User engagement &           │   │
        │  │  re-activation               │   │
        │  └──────────────────────────────┘   │
        └──────────────┬─────────────────────┘
                       │
        ┌──────────────▼─────────────────────┐
        │         Caching Layer               │
        │                                     │
        │  ┌──────────────────────────────┐   │
        │  │  Supabase (PostgreSQL)       │   │
        │  │  Stores analyzed ToS results │   │
        │  │  for instant cache hits      │   │
        │  └──────────────────────────────┘   │
        │  ┌──────────────────────────────┐   │
        │  │  AWS                         │   │
        │  │  Backup & scalable storage   │   │
        │  │  for high-traffic periods    │   │
        │  └──────────────────────────────┘   │
        │                                     │
        │  📦 40,000+ websites cached          │
        │  ⚡ Zero re-scan for known sites     │
        └─────────────────────────────────────┘
```

### Key Engineering Decisions

| Challenge | Solution | Result |
|---|---|---|
| Slow scan speed (4+ min) | Parallel chunking + concurrent API calls | **< 20 seconds** |
| Repeated scans wasting API calls | Supabase + AWS caching layer | **Instant results for 40,000+ cached sites** |
| Generic risk flags on streaming sites | Context-aware filtering per industry | Relevant, noise-free results |
| Multi-language ToS documents | Language detection + multilingual AI prompting | **20+ languages supported** |
| Backend reliability | 4 independent Cloudflare Workers | Isolated failure domains |

---

## Tech Stack

**Extension**
- JavaScript (Manifest V3)
- Chrome Extensions API
- Content Scripts & Service Workers

**Backend**
- Cloudflare Workers (4 autonomous workers)
- REST API architecture
- Multi-model AI pipeline

**Database & Caching**
- Supabase (PostgreSQL) — primary cache for analyzed ToS results
- AWS — scalable backup storage
- 40,000+ websites terms stored and growing

**Infrastructure & Recognition**
- Google Certified Software Publisher
- AWS Founders Club
- NVIDIA Inception Program
- Granted Patent

---

## Performance

```
Scan speed (before):   ████████████████████████  4+ minutes
Scan speed (after):    ██  < 20 seconds

Cache hit (known site): ⚡ Instant — no scan needed

DB coverage:  40,000+ websites already analyzed and cached
Installs:     3,000+
Downloads:    1,000+
```

---

## Project Status

| Milestone | Status |
|---|---|
| Chrome Web Store listing | ✅ Live |
| Patent filing | ✅ Granted |
| Google Publisher certification | ✅ Certified |
| AWS Founders Club | ✅ Member |
| NVIDIA Inception Program | ✅ Member |
| 3,000+ installs | ✅ Reached |
| 20+ language support | ✅ Live |
| 40,000+ websites cached | ✅ Live |

---

## Selected Code Snippets

> The following snippets illustrate specific technical approaches. They are intentionally partial and non-functional in isolation.

### Parallel Chunk Processing (simplified)

```javascript
// Split large ToS document into chunks and process in parallel
async function analyzeInParallel(documentText) {
  const chunks = splitIntoChunks(documentText, MAX_CHUNK_SIZE);

  const results = await Promise.all(
    chunks.map(chunk => analyzeChunk(chunk))
  );

  return mergeResults(results);
}
```

### Cache-First Lookup (simplified)

```javascript
// Check cache before triggering a full AI scan
async function getAnalysis(websiteUrl) {
  const cached = await supabase
    .from('terms_cache')
    .select('result')
    .eq('url', websiteUrl)
    .single();

  if (cached.data) return cached.data.result; // instant

  return await runFullScan(websiteUrl); // only if not cached
}
```

### Industry-Aware Scoring (simplified)

```javascript
// Adjust risk thresholds based on the website's industry
function getIndustryThresholds(industry) {
  const thresholds = {
    streaming:  { contentUpload: 'low',  dataSelling: 'high' },
    ecommerce:  { contentUpload: 'none', dataSelling: 'high' },
    saas:       { contentUpload: 'low',  dataSelling: 'medium' },
    default:    { contentUpload: 'medium', dataSelling: 'high' },
  };
  return thresholds[industry] ?? thresholds.default;
}
```

---

## About the Developer

Built by **Amir Samidarwish** — CS student (Honors Track) at Bar-Ilan University, founder and lead engineer of TermOver AI.

- 🎓 Bar-Ilan University — Computer Science, Excellence/Honors Track (selected from thousands of applicants)
- 🏆 Google Certified Software Publisher
- 🚀 AWS Founders Club Member
- 🤖 NVIDIA Inception Program Member
- 🔬 MEET Program — MIT & Hebrew University

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com)

---

<div align="center">
<sub>© TermOver AI — Proprietary software. Patent granted. All rights reserved.</sub>
</div>
