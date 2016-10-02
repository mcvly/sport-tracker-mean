var express = require('express');
var router = express.Router();
var trainingDao = require("../services/trainigsDAO");

/* GET training by id. */
router.get('/names', function(req, resp, next) {
  trainingDao.trainingById(itemId)
    .then(function(item) {
      if (!item) return next(new Error("Training not found by id " + itemId));
      resp.render('training', {training: item})
    })
});
