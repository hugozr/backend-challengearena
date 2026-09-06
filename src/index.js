import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

// Ruta Hola Mundo
fastify.get('/', async (request, reply) => {
  return { message: '¡Hola Mundo!' };
});

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port: Number(port), host: '0.0.0.0' });
    console.log(`Servidor corriendo en http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
