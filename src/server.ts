import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { mongoGraphql } from './middleware';

async function start() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);
  const mongoUri = process.env.APP_MONGO;

  // Serve the root as a static site to access graphiql
  app.use(express.static(path.resolve('.')));

  // Endpoint will run incoming graphql query into mongo
  // query and return the results
  app.post('/graphql', mongoGraphql({
    uri: mongoUri,
    graphiql: true
  }));

  return app.listen(port);
}

start()
  .then(server => console.info(`App started listening on http://localhost:${server.address().port}`))
  .catch(err => {
    console.error(`Error Starting up`, err);
    process.exit(-1);
  });
