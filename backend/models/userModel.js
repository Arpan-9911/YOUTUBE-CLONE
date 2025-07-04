import mongoose from "mongoose";

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
  channelName: {
    type: String,
    default: null
  },
  likedVideos: {
    type: Array,
    default: []
  },
  watchLater: {
    type: Array,
    default: []
  },
  history: {
    type: [
      {
        video: {
          type: String,
          required: true
        },
        channelName: {
          type: String,
          required: true
        },
        seenAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;