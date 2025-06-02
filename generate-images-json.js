const fs = require('fs');
const path = require('path');

const rootFolder = path.join(__dirname, 'library');
const outputFile = path.join(__dirname, 'images.json');
const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm'];

const getImagesFromFolder = (folderPath, relativePath = '') => {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  let images = [];

  entries.forEach(entry => {
    const fullPath = path.join(folderPath, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      images = images.concat(getImagesFromFolder(fullPath, relPath));
    } else if (entry.isFile() && validExtensions.includes(path.extname(entry.name).toLowerCase())) {
      images.push({
        src: path.posix.join('library', relPath).replace(/\\/g, '/'),
        alt: entry.name,
        caption: entry.name.replace(/\.[^/.]+$/, ''),
        folder: relativePath.split(path.sep)[0]
      });
    }
  });

  return images;
};

const allImages = getImagesFromFolder(rootFolder);

fs.writeFile(outputFile, JSON.stringify(allImages, null, 2), err => {
  if (err) return console.error('Error writing JSON:', err);
  console.log('✅ images.json created with', allImages.length, 'items.');
});
