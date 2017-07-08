import * as util from 'util';
import { handleAsync } from './utils/handle-async';
import { DocumentNode } from 'graphql';
import { parse } from 'graphql/language/parser';
import { Handler } from 'express';
import { GraphQLMongoQueryExecutor } from 'graphql-anywhere-mongodb';

export function graphqlMongoMiddleware(executor: GraphQLMongoQueryExecutor): Handler {
  return handleAsync(async (req, res) => {
    const { query, variables } = req.body;
    console.log(`Received graphql request`, query, variables);

    // Convert to graphql template string
    let processedQuery: DocumentNode;
    try {
      processedQuery = parse(query);
      console.log(`Processed query`, util.inspect(processedQuery, { depth: Infinity, colors: true }));
    } catch (err) {
      res.json({
        data: null,
        errors: [
          err
        ]
      });
    }

    try {
      const result = await executor.find(processedQuery, variables);
      console.log(`Executed operation`, result);
      res.json(result);
    } catch (err) {
      res.json({
        data: null,
        errors: [
          err
        ]
      });
    }
  });
}
