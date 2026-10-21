/**
 * Generates PWA icons and the OG banner from the KL monogram mark.
 *
 * Run once with `node src/scripts/generate-icons.mjs` after editing the mark,
 * and commit the outputs from `public/` as generated artifacts.
 *
 * Keep the `<path>` markup in sync with src/components/kl-mark.tsx.
 */
import sharp from "sharp"

const KLMARK_PATHS =
  "M32 0h64v256H32ZM160 0h64v64h-64ZM96 64h64v128H96ZM160 192h64v64h-64Z M288 0h64v192h128v64H288Z"

const FOREGROUND = "#18181b"
const BACKGROUND = "#ffffff"
const MUTED = "#71717a"

function iconSvg(width, height, markWidth, background) {
  const scale = markWidth / 512
  const markHeight = 256 * scale
  const x = (width - markWidth) / 2
  const y = (height - markHeight) / 2

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${background}"/><g transform="translate(${x} ${y}) scale(${scale})"><path d="${KLMARK_PATHS}" fill="${FOREGROUND}"/></g></svg>`
}

function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BACKGROUND}"/>
  <rect x="0" y="0" width="1200" height="4" fill="${FOREGROUND}"/>
  <rect x="0" y="626" width="1200" height="4" fill="${FOREGROUND}"/>
  <g transform="translate(370 130) scale(0.90234375)"><path d="${KLMARK_PATHS}" fill="${FOREGROUND}"/></g>
  <text x="600" y="470" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="64" letter-spacing="6" fill="${FOREGROUND}">KRUTAN LAKESHRI</text>
  <text x="600" y="540" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="30" letter-spacing="2" fill="${MUTED}">Software Developer &amp; Full Stack Engineer - krutan.site</text>
</svg>`
}

await sharp(Buffer.from(iconSvg(192, 192, 152, BACKGROUND)))
  .png()
  .toFile("public/icon-192.png")
await sharp(Buffer.from(iconSvg(512, 512, 408, BACKGROUND)))
  .png()
  .toFile("public/icon-512.png")
// Maskable icons crop to a circle; keep the mark inside the safe zone (~66%).
await sharp(Buffer.from(iconSvg(512, 512, 336, BACKGROUND)))
  .png()
  .toFile("public/icon-maskable-512.png")
await sharp(Buffer.from(ogSvg()))
  .png({ quality: 100, compressionLevel: 9 })
  .toFile("public/og-image.png")

console.log("Generated public/icon-192.png, icon-512.png, icon-maskable-512.png, og-image.png")
