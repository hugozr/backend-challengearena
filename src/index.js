import { buildApp } from './app.js';

const app = buildApp();

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen({ port: Number(port), host: '0.0.0.0' });
    console.log(`Servidor corriendo en http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
