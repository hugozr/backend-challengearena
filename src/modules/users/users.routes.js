import { getUsers } from './users.controller.js';

export async function usersRoutes(fastify, options) {
  fastify.get('/', getUsers);
}
