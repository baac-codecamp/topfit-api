const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  planId:  { type: Number, trim: true},
  planDetail:  { type: String, trim: true},
  protein:  { type: Number, default: 0, trim: true},
  fat:  { type: Number, default: 0, trim: true},
  crab:  { type: Number, default: 0, trim: true},
  
  
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'dietPlan'
});
// createdDate: { type: Date, default: Date.now}, 

// schema.virtual('comments', {
//   ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
//   localField: '_id', //_id ฟิลด์ของโมเดล dietPlan (ไฟล์นี้)
//   foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
// });

const dietPlan = mongoose.model('dietPlan', schema);

module.exports = dietPlan;