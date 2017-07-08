import * as express from 'express';
import * as bodyParser from 'body-parser';
import graphql from 'graphql-anywhere-mongodb';
import { handleAsync } from './utils/handle-async';
import { parse } from 'graphql/language/parser';
import { DocumentNode } from 'graphql';

async function start() {
  const app = express();
  const port = process.env.PORT;
  const mongoUri = process.env.APP_MONGO;

  // Connect to mongo
  const graphqlExecutor = await graphql.forUri(mongoUri);

  // Serve the root as a static site to access graphiql
  app.use(express.static(__dirname));

  // Setup JSON parsing
  bodyParser.json();

  // Endpoint will run incoming graphql query into mongo
  // query and return the results
  app.post('/graphql', handleAsync(async (req, res) => {
    const { query, variables } = req.body;

    // Convert to graphql template string
    let processedQuery: DocumentNode;
    try {
      processedQuery = parse(query);
    } catch(err) {
      res.json({
        data: null,
        errors: [
          err
        ]
      });
    }

    try {
      const result = await graphqlExecutor.find(processedQuery, variables);
      res.json(result);
    } catch (err) {
      res.json({
        data: null,
        errors: [
          err
        ]
      });
    }
  }));

  return app.listen(port);
}

start()
  .then(server => console.info(`App started listening on http://localhost:${server.address().port}`))
  .catch(err => console.error(`Error Starting up`, err));
