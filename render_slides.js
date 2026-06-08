const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, 'carousel/Cupping Session Vol2 Carousel.html');
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

  // Wait for fonts
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  const slides = await page.$$('.thumb');

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    // Each thumb is 360x360 but the actual slide inside is 1080x1080 scaled
    // We want the full 1080x1080 scaler child
    const scaler = await slide.$('.scaler');
    const section = await scaler.$('.slide');
    const box = await section.boundingBox();

    // Screenshot the full 1080x1080 slide directly
    await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 1 });

    // Temporarily scale the slide to full size
    const slideIdx = i + 1;
    await page.evaluate((idx) => {
      const thumbs = document.querySelectorAll('.thumb');
      const thumb = thumbs[idx - 1];
      const scaler = thumb.querySelector('.scaler');
      scaler.style.transform = 'scale(1)';
      thumb.style.width = '1080px';
      thumb.style.height = '1080px';
      thumb.style.borderRadius = '0';
      thumb.style.boxShadow = 'none';
    }, slideIdx);

    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 300));

    const updatedSection = (await page.$$('.thumb .scaler .slide'))[i];
    await updatedSection.screenshot({
      path: `slide_0${slideIdx}.png`,
      type: 'png',
    });

    console.log(`Saved slide_0${slideIdx}.png`);

    // Restore
    await page.evaluate((idx) => {
      const thumbs = document.querySelectorAll('.thumb');
      const thumb = thumbs[idx - 1];
      const scaler = thumb.querySelector('.scaler');
      scaler.style.transform = 'scale(.3333333)';
      thumb.style.width = '360px';
      thumb.style.height = '360px';
      thumb.style.borderRadius = '26px';
      thumb.style.boxShadow = '';
    }, slideIdx);
  }

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
