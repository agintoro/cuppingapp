import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, 'public', 'indragiri-carousel.html');
const outputDir = join(__dirname, 'public', 'carousel-slides');

import { mkdirSync } from 'fs';
mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1080, height: 1350 });
await page.goto('file://' + htmlPath);
await page.waitForLoadState('networkidle');

// Wait for fonts
await page.waitForTimeout(1500);

const N = 4;

for (let i = 0; i < N; i++) {
  // Navigate to slide i via JS
  await page.evaluate((idx) => {
    const track = document.getElementById('track');
    track.style.transition = 'none';
    track.style.transform = `translateX(${-idx * 1080}px)`;
    // Update UI state
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, k) => {
      d.className = 'dot' + (k === idx ? ' active' : '');
    });
    const counter = document.getElementById('counter');
    const pad = n => (n < 10 ? '0' : '') + n;
    counter.textContent = `Swipe · ${pad(idx+1)} / 04`;
  }, i);

  // Hide nav chrome for clean export
  await page.evaluate(() => {
    document.querySelector('.nav.prev').style.display = 'none';
    document.querySelector('.nav.next').style.display = 'none';
    document.querySelector('.dots').style.display = 'none';
    document.querySelector('.counter').style.display = 'none';
  });

  // Clip to frame
  const frame = await page.$('.frame');
  const box = await frame.boundingBox();

  const slideNum = String(i + 1).padStart(2, '0');
  await page.screenshot({
    path: join(outputDir, `slide-${slideNum}.png`),
    clip: { x: box.x, y: box.y, width: 1080, height: 1350 },
  });
  console.log(`Exported slide ${slideNum}`);
}

await browser.close();
console.log(`\nAll slides saved to: ${outputDir}`);
