import challengesData from './data/challenges.json' with { type: 'json' };

export const getAllChallenges = async () => {
  return challengesData;
};

export const getChallengesByCategory = async (categoryId) => {
  const numericId = Number(categoryId);
  return challengesData.filter((challenge) => challenge.categoryId === numericId);
};
