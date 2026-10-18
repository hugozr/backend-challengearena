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

export const deactivateTransfer = async (request, reply) => {
  const id = request.params?.id ?? request.body?.p_id ?? request.body?.id;

  
  if (id === undefined || id === null || id === '') {
    return reply.code(400).send({
      error: 'Parámetro requerido faltante',
      message: 'El identificador "p_id" (o parámetro de ruta ":id") es obligatorio'
    });
  }

  const result = await transfersService.deactivateTransferById(id);
  return reply.code(result.status).send(result.data);
};
