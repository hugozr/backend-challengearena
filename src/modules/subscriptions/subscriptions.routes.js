import { getSubscriptions } from './subscriptions.controller.js';

export async function subscriptionsRoutes(fastify, options) {
  fastify.get('/', getSubscriptions);
}
