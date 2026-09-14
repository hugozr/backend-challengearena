import * as challengesService from './challenges.service.js';

export const getChallenges = async (request, reply) => {
  const challenges = await challengesService.getAllChallenges();
  return challenges;
};

export const getChallengeByCategory = async (request, reply) => {
  const { id } = request.params;
  const challenges = await challengesService.getChallengesByCategory(id);
  return challenges;
};
