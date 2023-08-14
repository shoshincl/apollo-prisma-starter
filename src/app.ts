import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import { PrismaClient } from '@prisma/client';

import cors from 'cors';
import http from 'http';
import express from 'express';

import { schema } from './api/schema';

export interface Context {
  prisma: PrismaClient;
}

const app = express();

const httpServer = http.createServer(app);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const server = new ApolloServer<Context>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function init() {
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: '*',
      methods: ['POST', 'GET'],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        prisma,
      }),
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.APP_PORT }, resolve)
  ).then(() =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.APP_PORT}/graphql`
    )
  );
}

init();
