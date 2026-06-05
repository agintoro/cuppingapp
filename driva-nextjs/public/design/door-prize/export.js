#!/usr/bin/env node
/**
 * Export Door Prize Story.html → PNG + MP4
 * Run: node export.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HTML_FILE = path.resolve(__dirname, 'Door Prize Story.html');
const OUT_DIR = path.resolve(__dirname, '../../exports/door-prize');
const PNG_OUT = path.join(OUT_DIR, 'door-prize-story.png');
const FRAMES_DIR = path.join(OUT_DIR, 'frames');
const MP4_OUT = path.join(OUT_DIR, 'door-prize-story.mp4');

const STORY_W = 1080;
const STORY_H = 1920;
// MP4: 3 seconds at 30fps = 90 frames to capture the shimmer animation
const FPS = 30;
const DURATION_SEC = 4.5; // one full shimmer cycle
const TOTAL_FRAMES = Math.round(FPS * DURATION_SEC);

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--font-render-hinting=none',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: STORY_W, height: STORY_H, deviceScaleFactor: 1 });

  const fileUrl = 'file://' + HTML_FILE;
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Force full 1080×1920 scale (no viewport scaling needed since we match exactly)
  await page.evaluate((w, h) => {
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.style.transform = 'scale(1)';
      wrapper.style.transformOrigin = 'top left';
    }
    document.body.style.width = w + 'px';
    document.body.style.height = h + 'px';
    document.body.style.overflow = 'hidden';
  }, STORY_W, STORY_H);

  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));

  // ── PNG export ───────────────────────────────────────────────
  console.log('Capturing PNG...');
  await page.screenshot({ path: PNG_OUT, clip: { x: 0, y: 0, width: STORY_W, height: STORY_H } });
  console.log('PNG saved:', PNG_OUT);

  // ── MP4 export via frame sequence ────────────────────────────
  const ffmpegAvailable = (() => {
    try { execSync('which ffmpeg', { stdio: 'ignore' }); return true; } catch { return false; }
  })();

  if (ffmpegAvailable) {
    console.log(`Capturing ${TOTAL_FRAMES} frames for MP4...`);

    // Pause CSS animations so we can step them manually
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        el.style.animationPlayState = 'paused';
      });
    });

    const shimmerDuration = 4500; // ms, matching CSS
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const t = (i / FPS) * 1000; // ms into animation
      // Set animation-delay to negative offset to control frame
      await page.evaluate((delayMs, dur) => {
        document.querySelectorAll('.gold').forEach(el => {
          el.style.animationDelay = `-${delayMs % dur}ms`;
          el.style.animationPlayState = 'running';
        });
        document.querySelectorAll('.spk').forEach(el => {
          const baseDelay = parseFloat(el.style.animationDelay) || 0;
          el.style.animationDelay = `-${Math.max(0, delayMs - Math.abs(baseDelay) * 1000)}ms`;
          el.style.animationPlayState = 'running';
        });
      }, t, shimmerDuration);

      const framePath = path.join(FRAMES_DIR, `frame-${String(i).padStart(4, '0')}.png`);
      await page.screenshot({ path: framePath, clip: { x: 0, y: 0, width: STORY_W, height: STORY_H } });

      if (i % 10 === 0) process.stdout.write(`  frame ${i}/${TOTAL_FRAMES}\r`);
    }
    console.log('\nFrames captured. Encoding MP4...');

    execSync(
      `ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame-%04d.png" ` +
      `-vcodec libx264 -pix_fmt yuv420p -crf 18 "${MP4_OUT}"`,
      { stdio: 'inherit' }
    );
    console.log('MP4 saved:', MP4_OUT);

    // Clean up frames
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  } else {
    console.log('ffmpeg not found — skipping MP4 export.');
    console.log('To generate MP4, install ffmpeg and re-run this script.');

    // Fallback: capture a multi-frame WebM using puppeteer's built-in recorder
    console.log('Attempting WebM capture via puppeteer screencast...');
    try {
      const recorder = await page.screencast({ path: MP4_OUT.replace('.mp4', '.webm') });
      await new Promise(r => setTimeout(r, Math.round(DURATION_SEC * 1000)));
      await recorder.stop();
      console.log('WebM saved:', MP4_OUT.replace('.mp4', '.webm'));
    } catch (e) {
      console.log('Screencast not supported in this puppeteer version:', e.message);
    }
  }

  await browser.close();
  console.log('\nExport complete.');
  console.log('  PNG:', PNG_OUT);
  if (ffmpegAvailable) console.log('  MP4:', MP4_OUT);
}

run().catch(err => { console.error(err); process.exit(1); });
