const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = Schema({
  userId:  { type: String, required: true, unique: true, trim: true, index: true },
  userName:  { type: String, required: true, unique: true, trim: true, index: true },
  password: { type: String, required: true, trim: true , minlength: 3 },
  email: { type: String, required: true, trim: true, unique: true, index: true },
  displayname:  { type: String, required: true, unique: true, trim: true, index: true },
  arrFriendId: { type: Array}
},{
  collection: 'user'
});

userSchema.methods.encryptPassword = async (password)  => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

userSchema.methods.comparePassword = async function (password)  {
  console.log(password);
  console.log(this.password);
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}
  
  const user = mongoose.model('User', userSchema);
  
  module.exports = user;