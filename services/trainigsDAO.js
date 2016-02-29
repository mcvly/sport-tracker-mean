var mongo = require('./mongo.js');
var seq = require('./sequenceGenerator');

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

module.exports.addNewTraining = function(trainingDoc) {
  return seq.nextTrainingId()
  .then(function(id) {
    trainingDoc['_id'] = id.sequence_value;
    if (!trainingDoc.date) {
      trainingDoc.date = Date.now();
    }
    var types = trainingDoc.type.split(',');
    trainingDoc.type = types.map(t => t.trim());
    return mongo.trainings.insertOne(trainingDoc);
  })
};

//module.exports.trainingById = function(itemId) {
//  var o_id = new mongodb.ObjectID(itemId);
//  return mongo.trainings.find({_id: o_id}).limit(1).next()
//};