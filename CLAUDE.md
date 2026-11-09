# Portfolio site

## Goal
A one-page portfolio on rlukafiardi.github.io: CV experience as a timeline first, then personal projects as cards. Success: a recruiter understands who this is in ten seconds, on a phone.

## Data
- Source: `~/Downloads/Resume - Radikal Lukafiardi.pdf` (experience, skills) and each project's CLAUDE.md (numbers). No other data.
- The CV PDF is not published: it contains a phone number.

## Decisions
- 2026-11-09: plain HTML/CSS, English only, experience timeline from the CV only (no employer case studies), brand palette from `social-posting`.
- 2026-11-09: contact = GitHub, LinkedIn, mailto (email public by the owner's choice).
- Private project (idx-sharia-lq45) shown as a card with no repo link and no diagram (the diagram names the Yahoo terms caveat).
- 2026-11-09: all 32 CV bullets verbatim; Satu Dental, Caribencana and PWYP collapsed in <details> (owner approved).
- 2026-11-09: public email and LinkedIn approved by the owner; no CV download (CV has a phone number). The first commit (`Portfolio site`) is the squashed history; 4 commits followed on the same day, all with the noreply address.
- Contact line says "data scientist roles" (owner wording).

## Status
- Live 2026-11-09 at https://rlukafiardi.github.io (public repo `rlukafiardi/rlukafiardi.github.io`, Pages from `main`). Order: experience, projects, skills, contact.
- `node tests/e2e.mjs [url]` (puppeteer-core, desktop + phone): section order, images, no failed requests, no horizontal scroll, nav jump, no phone number. Passes on the live URL.
- Light mode checked by the owner (works). No custom domain (not wanted).
- 2026-11-09: the e2e no-phone regex used a fragment of the number; replaced by a generic Indonesian phone pattern and history squashed to one commit (force-push).
