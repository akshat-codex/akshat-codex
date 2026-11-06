# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

GitHub profile README (`akshat-codex/akshat-codex`). Markdown plus GitHub's sanitized HTML subset only; no CSS, no JavaScript. Visual richness ships as self-hosted SVG files in `assets/` (CSS animation inside SVG works when loaded through `<img>`), plus the existing snake workflow output on the `output` branch.

## Users

Developers browsing GitHub: engineers who land on the profile from a repo, a follow, or a search, and decide in a few seconds whether this person is worth following and whose work is worth opening.

## Product Purpose

Make a developer visitor open Akshat's projects. Success is a click into a repository, not a contact form.

## Positioning

Backend developer who builds AI systems that refuse to fabricate. The flagship project's own contract is "QUALITY > QUANTITY — nothing is ever fabricated or guessed; missing evidence stays HOLD." That evidence-first stance is the distinctive, truthful claim.

## Operating Context

Viewed on github.com, mostly desktop, dark or light theme (the snake already ships dark/light variants). Images are proxied through GitHub's camo; external image services can go down (github-readme-stats returned 503, activity-graph 402 on 2026-11-07).

## Capabilities and Constraints

- Identity (confirmed, from existing README/bio): Akshat Srivastava, Backend Developer, India. Specialty: AI • Backend • Cloud • Automation. Mission: "Build reliable systems that scale."
- Stack (confirmed): Python, Django, FastAPI, Node.js, REST APIs, Celery, Redis; AWS, Docker, Kubernetes, Linux, Git, CI/CD; PostgreSQL, MongoDB, DynamoDB; NLP, ML, process automation, AI-powered APIs.
- Links: LinkedIn https://www.linkedin.com/in/akshhatsrivastava/ · email akshsvt123@gmail.com · GitHub akshat-codex.
- Existing asset to keep: contribution snake (`.github/workflows/snake.yml` → `output` branch).

## Evidence on Hand

- `ai-lead-agent` (public, Python): ICP lead discovery + qualification pipeline. Stages from its README: ICP intake → company discovery (fast / safe / hard modes; Explorium, Tavily, Serper, Hermes) → evidence-gated hard-rule validation → decision-maker discovery & enrichment (Unipile, Apollo) → LLM qualification + adversarial review → ranking, dedupe, export (CSV/JSON, HubSpot/Salesforce import CSV). Bring-your-own-keys; runs on flagged mock data with zero keys. Has backend, frontend, docker-compose, tests, docs.
- No stars, followers, employers, client names, metrics or testimonials to cite. Do not invent any.

## Product Principles

1. Evidence over decoration: every claim on the page is checkable.
2. The work is the hero; identity supports it.
3. Survive service outages: nothing load-bearing depends on a flaky third-party card.
4. Stand out to engineers, who distrust hype; precision reads as competence.

## Accessibility & Inclusion

Every image has meaningful alt text; animated SVGs respect `prefers-reduced-motion`; text inside SVGs stays legible at GitHub's ~830px content width.
