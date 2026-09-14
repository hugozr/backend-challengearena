import { getChallengeByCategory } from './challenges.controller.js';

export async function challengesRoutes(fastify, options) {
  fastify.get('/:id/by-category', getChallengeByCategory);
}
