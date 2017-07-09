import { Handler } from 'express';

export function handleAsync(handler: Handler): Handler {
  return (req, res, next) => {
    try {
      Promise
        .resolve(handler(req, res, next))
        .catch(next);
    } catch (err) {
      next(err);
    }
  };
}
