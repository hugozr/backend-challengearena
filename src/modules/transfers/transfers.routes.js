import { createTransfer, deactivateTransfer } from './transfers.controller.js';

export async function transfersRoutes(fastify, options) {
  fastify.post('/', createTransfer);
  fastify.post('/create', createTransfer);
  fastify.post('/deactivate', deactivateTransfer);
  fastify.post('/deactivate/:id', deactivateTransfer);
}
