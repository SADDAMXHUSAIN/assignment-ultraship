const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { authenticateToken } = require('./auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize in-memory database
const { initializeDatabase, getDatabase } = require('./database');
initializeDatabase();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        let user = null;
        
        if (token) {
          try {
            user = authenticateToken(token);
          } catch (error) {
            // Invalid token, user remains null
          }
        }
        
        return { user, db: getDatabase() };
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});

