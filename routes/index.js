var express = require('express');
var _ = require('lodash');

var router = express.Router();
var trainingDao = require("../services/trainigsDAO");
var defaultItemsPerPage = 3;

/* GET home page. */
router.get('/', function(req, resp, next) {
  var page = req.query.page ? parseInt(req.query.page) - 1 : 0;
  var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : defaultItemsPerPage;
  var context = {
    'itemsPerPage' : page
  };
  var numPages = 0;
  trainingDao.trainingsCount()
  .then(res => {
    if (res > pageSize) {
      numPages = Math.ceil(res / defaultItemsPerPage);
    }
    return trainingDao.trainingsByDatePaged(page, pageSize);
  })
  .then(res => resp.render('index', { trainings: res, pageContext: context, title: 'Sports Tracker', pagination: {
    page: page+1,
    pageCount: numPages
  }}))
  .catch(err => next(err));
});

module.exports = router;
