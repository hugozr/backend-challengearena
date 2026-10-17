import { createTransfer } from './transfers.controller.js';

export async function transfersRoutes(fastify, options) {
  fastify.post('/', createTransfer);
  fastify.post('/create', createTransfer);
}
