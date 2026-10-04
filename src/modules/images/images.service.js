import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.bmp',
  '.ico'
]);

export const getImagesList = async (imagesDir, baseUrl) => {
  try {
    const files = await readdir(imagesDir);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ALLOWED_EXTENSIONS.has(ext);
    });

    const imagesInfo = await Promise.all(
      imageFiles.map(async (filename) => {
        const filePath = path.join(imagesDir, filename);
        const fileStat = await stat(filePath);

        return {
          name: filename,
          size: fileStat.size,
          url: `${baseUrl}/images/${filename}`,
          downloadUrl: `${baseUrl}/images/${filename}?download=true`
        };
      })
    );

    return imagesInfo;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};
