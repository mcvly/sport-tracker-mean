var mongo = require('./mongo.js');

module.exports.allTrainings = function() {
  return mongo.trainings.find({}).toArray();
};

module.exports.trainingsByDatePaged = function(page, itemsPerPage) {
  return mongo.trainings
    .find({})
    .sort({date: -1})
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)
    .toArray();
};

module.exports.trainingsCount = function() {
  return mongo.trainings.count({});
};