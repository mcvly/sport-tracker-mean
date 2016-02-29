var mongo = require('./mongo.js');

module.exports.nextTrainingId = function() {
  return getNextSequenceValue('trainings');
};

function getNextSequenceValue(sequenceName){
  return mongo.sequence.findOneAndUpdate(
    {_id: sequenceName },
    {$inc:{sequence_value:1}},
    {upsert: true}
  )
  .then(() => mongo.sequence.find({_id: sequenceName}, {_id: 0, sequence_value: 1}).limit(1).next())
}