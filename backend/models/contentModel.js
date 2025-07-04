import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
  uploadedBy: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  views: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [
      {
        commentedBy: String,
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model("Content", contentSchema);