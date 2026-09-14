import Fastify from 'fastify';
import { challengesRoutes } from './modules/challenges/challenges.routes.js';
import { subscriptionsRoutes } from './modules/subscriptions/subscriptions.routes.js';
import { usersRoutes } from './modules/users/users.routes.js';

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

  return fastify;
}
