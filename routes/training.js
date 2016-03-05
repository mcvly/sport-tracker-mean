var express = require('express');
var router = express.Router();
var moment = require('moment');
var trainingDao = require("../services/trainigsDAO");

/* GET training by id. */
router.get('/:id', function(req, resp, next) {
  var itemId = parseInt(req.params.id);
  trainingDao.trainingById(itemId)
    .then(function(item) {
      if (!item) return next(new Error("Training not found by id " + itemId));
      resp.render('training', {training: item})
    })
});

router.post('/', function(req, resp, next) {
  var date = req.body.date;
  if (!date) {
    date = new Date(Date.now());
  } else {
    date = moment(new Date(date)).utc().toDate();
  }
  var training = {
    type: req.body.type,
    date: date
  };
  trainingDao.addNewTraining(training)
    .then(res => resp.redirect('/'))
    .catch(err => next(err));
});

router.get('/', function (req, resp, next) {
  resp.render('addTraining', {});
});

router.get('/type/:type', function(req, resp, next) {
  var type = req.params.type;
  var page = req.query.page ? parseInt(req.query.page) - 1 : 0;
  var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 3;

  var context = {
    tag: type,
    pages: null
  };

  trainingDao.trainingsByTypeCount(type)
    .then(function (count) {
      if (count > pageSize) {
        context.pages = Math.ceil(count / pageSize);
      }
      return trainingDao.trainingsByType(type, page, pageSize)
    })
    .then(function (trainings) {
      context.trainings = trainings;
      resp.render('types', {context: context, pagination: {page: page + 1, pageCount: context.pages}})
    })
    .catch(err => next(err));
});

module.exports = router;
