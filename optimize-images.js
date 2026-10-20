const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'images';
const SIZES = [
  { dir: 'thumb', width: 1000, quality: 75 },
  { dir: 'large', width: 2000, quality: 80 },
];
const SKIP = /^qr-/i;

const kb = (bytes) => Math.round(bytes / 1024) + ' KB';

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f) && !SKIP.test(f));
  if (!files.length) return console.log('Không tìm thấy ảnh .jpg trong thư mục', SRC);

  SIZES.forEach((s) => fs.mkdirSync(path.join(SRC, s.dir), { recursive: true }));

  for (const f of files) {
    const input = path.join(SRC, f);
    const before = fs.statSync(input).size;
    const after = [];
    for (const s of SIZES) {
      const output = path.join(SRC, s.dir, f);
      await sharp(input)
        .rotate()
        .resize({ width: s.width, withoutEnlargement: true })
        .jpeg({ quality: s.quality, mozjpeg: true })
        .toFile(output);
      after.push(`${s.dir} ${kb(fs.statSync(output).size)}`);
    }
    console.log(`${f}: ${kb(before)} -> ${after.join(' | ')}`);
  }
  console.log('Xong!');
})();