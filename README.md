# Portfolio site

One-page portfolio for Radikal Lukafiardi: selected personal projects and experience, in plain HTML and CSS (no build step).
Deploys as a GitHub Pages user site at https://rlukafiardi.github.io (repo `rlukafiardi/rlukafiardi.github.io`, must be public).

## Edit
- Content: `index.html`. Styles: `style.css`. Images: `assets/` (taken from the public showcase repos and project diagrams).
- Order: experience, projects, skills, contact.

## Preview
`python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## Test
`npm ci`, then `node tests/e2e.mjs [url]` (puppeteer-core on the installed Chrome; defaults to the live URL): section order, images, failed requests, horizontal scroll on phone, nav jump, no phone number.
