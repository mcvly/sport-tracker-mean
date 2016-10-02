var mongo = require('./mongo.js');
var seq = require('./sequenceGenerator');

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

module.exports.addNewTraining = function(trainingDoc) {
  return seq.nextTrainingId()
  .then(function(id) {
    trainingDoc['_id'] = id.sequence_value;
    if (!Array.isArray(trainingDoc.type)) {
      trainingDoc.type = [trainingDoc.type];
    }
    return mongo.trainings.insertOne(trainingDoc);
  })
};

module.exports.trainingById = function(itemId) {
  return mongo.trainings.find({_id: itemId}).limit(1).next()
};

module.exports.trainingsByType = function(type, page, itemsPerPage) {
  return mongo.trainings
    .find({type: type})
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)
    .toArray();
};

module.exports.trainingsByTypeCount = function(type) {
  return mongo.trainings.count({type: type});
};

module.exports.exerciseGroups = function() {
  return mongo.exercises.aggregate([
    {$group: {_id: "$group", items: {$addToSet : "$name"}}},
    {$unwind: "$items"},
    {$sort: {items: 1}},
    {$group: {_id: "$_id", items: {$push : "$items"}}}
  ]);
};