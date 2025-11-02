#!/usr/bin/env node
/**
 * Generate PWA icons from SVG template
 * Run: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const publicDir = path.join(__dirname, '../public');

// Create simple SVG-based PNG using Canvas (if available) or just SVG fallback
const createSVGIcon = (size, maskable = false) => {
  const padding = maskable ? size * 0.1 : 0; // 10% safe zone for maskable
  const iconSize = size - padding * 2;
  const center = size / 2;
  const radius = iconSize * 0.3;
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0f172a"/>
  <circle cx="${center}" cy="${center}" r="${radius}" fill="#4fd1c5"/>
  <path d="M ${center - radius * 0.5} ${center} L ${center - radius * 0.1} ${center + radius * 0.4} L ${center + radius * 0.5} ${center - radius * 0.5}" 
        stroke="white" stroke-width="${radius * 0.2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
};

// Try to use sharp if available, otherwise fall back to saving SVG files
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('sharp not available, will save SVG files as fallback');
}

async function generateIcons() {
  for (const size of sizes) {
    for (const maskable of [false, true]) {
      const suffix = maskable ? '-maskable' : '';
      const filename = `icon-${size}x${size}${suffix}.png`;
      const filepath = path.join(publicDir, filename);
      
      const svg = createSVGIcon(size, maskable);
      
      if (sharp) {
        try {
          await sharp(Buffer.from(svg))
            .png()
            .toFile(filepath);
          console.log(`✓ Created ${filename}`);
        } catch (err) {
          console.error(`✗ Failed to create ${filename}:`, err.message);
          // Fallback to SVG
          fs.writeFileSync(filepath.replace('.png', '.svg'), svg);
          console.log(`  → Saved as SVG instead: ${filename.replace('.png', '.svg')}`);
        }
      } else {
        // No sharp, save as SVG
        const svgPath = filepath.replace('.png', '.svg');
        fs.writeFileSync(svgPath, svg);
        console.log(`✓ Created ${filename.replace('.png', '.svg')} (PNG conversion requires 'sharp' package)`);
      }
    }
  }
  
  if (!sharp) {
    console.log('\n⚠️  To generate PNG files, install sharp:');
    console.log('   pnpm add -D sharp');
    console.log('   Then run this script again.');
    console.log('\n💡 Alternative: Use an online tool or image editor to convert SVG → PNG');
  }
}

generateIcons().catch(console.error);
