import { getChallengeByCategory, getChallenges } from './challenges.controller.js';

export async function challengesRoutes(fastify, options) {
  fastify.get('/', getChallenges);
  fastify.get('/:id/by-category', getChallengeByCategory);
}
