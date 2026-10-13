import * as subscriptionsService from './subscriptions.service.js';

export const getSubscriptions = async (request, reply) => {
  return [];
};

export const claimBalance = async (request, reply) => {
  const number = request.params.number || request.body?.p_number;

  if (number === undefined || number === null || number === '') {
    return reply.code(400).send({ error: 'Parámetro number requerido' });
  }

  const result = await subscriptionsService.claimBalance(number);
  return reply.code(result.status).send(result.data);
};
