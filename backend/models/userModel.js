const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1740576945~exp=1740580545~hmac=472348e99022f4d455cf0cf4839c6f1dd5991ce89919b594edd31e17db4c7661&w=900",
  },
});

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next){
  if (this.ismodified){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;