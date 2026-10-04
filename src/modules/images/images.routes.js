import fastifyStatic from '@fastify/static';
import { IMAGES_DIR, getImages, getImageFile } from './images.controller.js';

export async function imagesRoutes(fastify, options) {
  // Registra @fastify/static en modo manual (serve: false) para disponer de reply.sendFile()
  await fastify.register(fastifyStatic, {
    root: IMAGES_DIR,
    serve: false
  });

  // GET /images -> Listado JSON de imágenes disponibles
  fastify.get('/', getImages);

  // GET /images/:filename -> Visualización y descarga
  fastify.get('/:filename', getImageFile);
}
