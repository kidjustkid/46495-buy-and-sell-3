'use strict';

const {Router} = require(`express`);
const {HTTP_CODES} = require(`../../../constants`);

module.exports = (app, searchService) => {
  const route = new Router();
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        code: HTTP_CODES.BAD_REQUEST,
        errorMessages: [`please set query...`]
      });
    }

    const response = searchService.search(query);

    return response.length ? res.status(HTTP_CODES.SUCCESS).json(response) : res.status(HTTP_CODES.NOT_FOUND).json(response);
  });

};
