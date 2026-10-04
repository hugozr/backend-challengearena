import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as imagesService from './images.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apunta a src/modules/challenges/data/images (donde están jessica.png y los retos)
const challengesImagesDir = path.resolve(__dirname, '../challenges/data/images');
const rootImagesDir = path.resolve(__dirname, '../../../data/images');

export const IMAGES_DIR = fs.existsSync(challengesImagesDir)
  ? challengesImagesDir
  : rootImagesDir;

export const getImages = async (request, reply) => {
  const protocol = request.protocol || 'http';
  const host = request.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  const images = await imagesService.getImagesList(IMAGES_DIR, baseUrl);
  return images;
};

export const getImageFile = async (request, reply) => {
  const { filename } = request.params;
  const { download } = request.query || {};

  if (download === 'true' || download === '1') {
    reply.header('Content-Disposition', `attachment; filename="${filename}"`);
  }

  return reply.sendFile(filename);
};
