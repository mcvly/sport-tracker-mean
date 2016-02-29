var express = require('express');
var router = express.Router();
var trainingDao = require("../services/trainigsDAO");

var defaultItemsPerPage = 5;
/* GET users listing. */
router.get('/', function(req, resp, next) {
  var page = req.query.page ? parseInt(req.query.page) - 1 : 0;
  var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : defaultItemsPerPage;
  trainingDao.trainingsByDatePaged(page, pageSize)
      .then(res => resp.json(res))
      .catch(err => next(err));
});

module.exports = router;
