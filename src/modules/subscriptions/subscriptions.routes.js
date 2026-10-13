import { getSubscriptions, claimBalance } from './subscriptions.controller.js';

export async function subscriptionsRoutes(fastify, options) {
  fastify.get('/', getSubscriptions);
  fastify.post('/claim-balance/:number', claimBalance);
  // También permite POST /claim-balance con body { p_number: ... }
  fastify.post('/claim-balance', claimBalance);
}
