import * as express from 'express';
import mongoGraphql from './middleware';

async function start() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);
  const mongoUri = process.env.APP_MONGO;

  app.use('/graphql', mongoGraphql({
    uri: mongoUri,
    graphiql: true,
    whitelist: ['restaurants'],
  }));

  return app.listen(port);
}

start()
  .then(server => console.info(`App started listening on http://localhost:${server.address().port}`))
  .catch(err => {
    console.error(`Error Starting up`, err);
    process.exit(-1);
  });
