var express = require('express');
var router = express.Router();
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
    date = Date.now();
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

module.exports = router;
