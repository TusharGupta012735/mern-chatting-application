const mongoose = require('mongoose');

//defining a model
const chatModel = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mesage",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{
    timestamps: true,
});

//creating a model
const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;