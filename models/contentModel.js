const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  contentId:  { type: String, trim: true},
  contentDetail:  { type: String, trim: true},
  imgUrl:  { type: String, trim: true},
 
  
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'content'
});
// createdDate: { type: Date, default: Date.now}, 

// schema.virtual('comments', {
//   ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
//   localField: '_id', //_id ฟิลด์ของโมเดล History (ไฟล์นี้)
//   foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
// });

const content = mongoose.model('Content', schema);

module.exports = content;