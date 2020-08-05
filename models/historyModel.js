const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  userId:  { type: String, trim: true},
  weight:  { type: Number, default: 0, trim: true},
  height:  { type: Number, default: 0, trim: true},
  fat:  { type: Number, default: 0, trim: true},
  BMI:  { type: Number, default: 0, trim: true},
  createdDate  : { type: Date, default: Date.now },
  
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'history'
});
// createdDate: { type: Date, default: Date.now}, 

// schema.virtual('comments', {
//   ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
//   localField: '_id', //_id ฟิลด์ของโมเดล History (ไฟล์นี้)
//   foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
// });

const history = mongoose.model('History', schema);

module.exports = history;