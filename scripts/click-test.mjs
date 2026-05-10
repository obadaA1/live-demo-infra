import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext();
const p = await ctx.newPage();
const errors = [];
p.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

await p.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1500);

// Try to find what's covering the hero CTA
const blocker = await p.evaluate(() => {
  const btn = document.querySelector('.btn-primary');
  if (!btn) return 'no btn-primary found';
  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const top = document.elementFromPoint(x, y);
  return {
    button: btn.textContent.trim(),
    btnTop: r.top, btnVis: r.width > 0 && r.height > 0,
    topElement: top ? top.tagName + '.' + (top.className || '').toString().slice(0, 80) : null,
    sameNode: top === btn || btn.contains(top),
  };
});
console.log('HERO BUTTON CHECK:', JSON.stringify(blocker, null, 2));

// Try clicking nav Demos link
try {
  await p.click('nav a[href="/demos"]', { timeout: 3000 });
  await p.waitForTimeout(800);
  console.log('NAV CLICK: navigated to', p.url());
} catch (e) {
  console.log('NAV CLICK failed:', e.message);
}

// Back to home
await p.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1500);

// Try clicking the See My Work button
const beforeY = await p.evaluate(() => window.scrollY);
try {
  await p.click('a.btn-primary', { timeout: 3000 });
  await p.waitForTimeout(1500);
  const afterY = await p.evaluate(() => window.scrollY);
  console.log('SEE MY WORK CLICK: scrolled from', beforeY, 'to', afterY);
} catch (e) {
  console.log('SEE MY WORK CLICK failed:', e.message);
}

console.log('--- ERRORS ---');
errors.forEach(e => console.log(e));
await b.close();
