import * as express from 'express';
import mongoGraphql from 'graphql-anywhere-mongodb-express';
import { NextFunction, Request, Response } from 'express';

async function start() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);
  const mongoUri = process.env.APP_MONGO;

  // GraphQL MongoDB route
  app.use('/graphql', mongoGraphql({
    uri: mongoUri,
    graphiql: true,
    whitelist: ['restaurants'],
  }));

  // Redirects / to /graphql
  app.get('/', (req, res) => res.redirect('/graphql'));

  // 404 Fallback
  app.use((req, res, next) => {
    const message = `Could not find resource: ${req.url}`;
    const err: any = new Error(message);
    err.status = 404;
    next(err);
  });

  // Error handling route
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;

    res.status(status).json({
      status,
      message: err.message,
      stack: (err.message || '').split('\n')
    });
  });

  return app.listen(port);
}

start()
  .then(server => console.info(`App started listening on http://localhost:${server.address().port}`))
  .catch(err => {
    console.error(`Error Starting up`, err);
    process.exit(-1);
  });
