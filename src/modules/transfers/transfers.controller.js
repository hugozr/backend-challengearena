import * as transfersService from './transfers.service.js';

export const createTransfer = async (request, reply) => {
  const { code, value, comment } = request.body || {};

  if (!code || value === undefined || value === null) {
    return reply.code(400).send({
      error: 'Parámetros requeridos faltantes',
      message: 'Los campos "code" y "value" son obligatorios en el body'
    });
  }

  const result = await transfersService.createTransfer({ code, value, comment });
  return reply.code(result.status).send(result.data);
};
