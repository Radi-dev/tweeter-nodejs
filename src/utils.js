const { Request, Response, RequestHandler, NextFunction } = require('express');

function asyncWrapOrError(callback= RequestHandler) {
  return (req= Request, res= Response, next= NextFunction) => {
    return Promise
      .resolve(callback(req, res, next))
      .catch(err => err ? next(err) : next(new Error('Unknown error.')));
  };
}
module.exports = asyncWrapOrError;