import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import graphql from 'graphql-anywhere-mongodb';
import { handleAsync } from './utils/handle-async';

import { DocumentNode } from 'graphql';
import { graphqlMongoMiddleware } from './mongo-graphql-middleware';

async function start() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);
  const mongoUri = process.env.APP_MONGO;

  // Connect to mongo
  const graphqlExecutor = await graphql.forUri(mongoUri);

  // Serve the root as a static site to access graphiql
  app.use(express.static(path.resolve('.')));
  console.log(`Dir is`, path.resolve('.'));

  // Setup JSON parsing
  app.use(bodyParser.json());

  // Static app
  app.get('/', (req, res) => res.sendFile(path.resolve('./static/index.html')));

  // Endpoint will run incoming graphql query into mongo
  // query and return the results
  app.post('/graphql', graphqlMongoMiddleware(graphqlExecutor));

  return app.listen(port);
}

start()
  .then(server => console.info(`App started listening on http://localhost:${server.address().port}`))
  .catch(err => {
    console.error(`Error Starting up`, err);
    process.exit(-1);
  });
