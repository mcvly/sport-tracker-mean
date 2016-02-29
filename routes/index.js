var express = require('express');
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
  trainingDao.trainingsCount()
  .then(res => {
    context.totalItems = res;
    var numPages = 0;
    if (res > pageSize) {
      numPages = Math.ceil(res / defaultItemsPerPage);
    }
    context.pages = numPages;
    context.curPage = page + 1;
    return trainingDao.trainingsByDatePaged(page, pageSize);
  })
  .then(res => resp.render('index', { trainings: res, pageContext: context, title: 'Sports Tracker'}))
  .catch(err => next(err));
});

module.exports = router;
