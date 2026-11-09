import puppeteer from "puppeteer-core";
const SITE = process.argv[2] || "https://rlukafiardi.github.io/";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); console.log(ok ? "ok  " : "FAIL", msg); };
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const [name, vp] of [["desktop", { width: 1280, height: 900 }], ["phone", { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }]]) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  const external = [], failed = [];
  page.on("request", r => { const u = new globalThis.URL(r.url()); if (u.host !== new globalThis.URL(SITE).host) external.push(u.host); });
  page.on("requestfailed", r => failed.push(r.url()));
  page.on("response", r => { if (r.status() >= 400) failed.push(r.status() + " " + r.url()); });
  await page.goto(SITE, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    for (const img of document.images) {
      img.scrollIntoView({ block: "center" });
      await Promise.race([new Promise(r => { if (img.complete) r(); else img.addEventListener("load", r, { once: true }); }), new Promise(r => setTimeout(r, 4000))]);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForNetworkIdle();
  const s = await page.evaluate(() => ({
    order: [...document.querySelectorAll("main > section")].map(x => x.id).filter(Boolean),
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    brokenImgs: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => `${i.src.split("/").pop()} complete=${i.complete} w=${i.naturalWidth}`),
    hrefs: [...document.querySelectorAll("main a[href]")].map(a => a.href),
    bullets: document.querySelectorAll(".timeline li li").length,
    details: [...document.querySelectorAll(".timeline details")].map(d => d.open),
    text: document.body.innerText,
  }));
  check(s.order.join() === "experience,projects,skills,contact", `${name}: section order ${s.order}`);
  check(s.bullets === 32, `${name}: all 32 CV bullets in the page (${s.bullets})`);
  check(s.details.length === 3 && s.details.every(o => !o), `${name}: 3 older roles start collapsed`);
  check(!s.overflow, `${name}: no horizontal scroll`);
  check(s.brokenImgs.length === 0, `${name}: all images load ${s.brokenImgs}`);
  check(failed.length === 0, `${name}: no failed requests ${failed}`);
  check(s.hrefs.some(h => h.includes("linkedin.com/in/radikal-lukafiardi")), `${name}: LinkedIn link`);
  check(!/\+62|\b0?8\d{2}[- ]?\d{3,4}[- ]?\d{3,5}\b|LINKEDIN_HANDLE|Yahoo/.test(s.text), `${name}: no phone or placeholder text`);
  console.log(`      third-party hosts: ${[...new Set(external)].join(", ") || "none"}`);
  await page.click('.timeline details summary');
  check(await page.evaluate(() => document.querySelector('.timeline details').open), `${name}: older role expands on click`);
  await page.click('nav a[href="#projects"]');
  await page.evaluate(async () => { let last = -1; while (window.scrollY !== last) { last = window.scrollY; await new Promise(r => setTimeout(r, 250)); } });
  const y = await page.evaluate(() => document.getElementById("projects").getBoundingClientRect().top);
  check(Math.abs(y) < 120, `${name}: nav jumps to Projects (top=${Math.round(y)})`);
  await page.close();
}
await browser.close();
process.exit(fails.length ? 1 : 0);
