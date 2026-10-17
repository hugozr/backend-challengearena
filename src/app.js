import Fastify from 'fastify';
import { challengesRoutes } from './modules/challenges/challenges.routes.js';
import { subscriptionsRoutes } from './modules/subscriptions/subscriptions.routes.js';
import { usersRoutes } from './modules/users/users.routes.js';
import { imagesRoutes } from './modules/images/images.routes.js';
import { claimBalance } from './modules/subscriptions/subscriptions.controller.js';
import { transfersRoutes } from './modules/transfers/transfers.routes.js';
import { createTransfer } from './modules/transfers/transfers.controller.js';

export function buildApp(options = {}) {
  const fastify = Fastify({
    logger: true,
    ...options
  });

  // Ruta raíz
  fastify.get('/', async (request, reply) => {
    return { message: '¡Hola Mundo!' };
  });

  // Registro de módulos con sus prefijos
  fastify.register(challengesRoutes, { prefix: '/challenges' });
  fastify.register(subscriptionsRoutes, { prefix: '/subscriptions' });
  fastify.register(usersRoutes, { prefix: '/users' });
  fastify.register(imagesRoutes, { prefix: '/images' });
  fastify.register(transfersRoutes, { prefix: '/transfers' });

  // Alias directos para conveniencia
  fastify.post('/claim-balance/:number', claimBalance);
  fastify.post('/claim-balance', claimBalance);
  fastify.post('/create-transfer', createTransfer);

  return fastify;
}
