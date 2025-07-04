import Content from '../models/contentModel.js';
import User from '../models/userModel.js'
import cloudinary from '../cloudinary.js'
import streamifier from 'streamifier';

export const uploadContent = async (req, res) => {
  try {
    const { title, description, category, channelName } = req.body
    const { userId } = req
    const videoBuffer = req.file?.buffer;
    if (!title || !description || !category || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const folderPath = `youtube-clone/${channelName}`;
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: folderPath,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(videoBuffer).pipe(stream);
      });
    const videoRes = await uploadStream();
    const thumbnailUrl = cloudinary.url(videoRes.public_id + ".jpg", {
      resource_type: "video",
      transformation: [
        { width: 480, height: 270, crop: "pad", background: "auto:predominant_gradient" },
        { start_offset: "1" }
      ],
    });
    const newContent = await Content.create({
      uploadedBy: userId,
      channelName,
      title,
      description,
      videoUrl: videoRes.secure_url,
      thumbnailUrl,
      category,
    });
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyContents = async (req, res) => {
  try {
    const { userId } = req;
    const contents = await Content.find({ uploadedBy: userId }).sort({ createdAt: -1 });
    res.status(200).json({content: contents});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getAllContents = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("history");
    
    const history = user?.history || [];
    const viewCount = {};
    history.forEach(({ channelName }) => {
      viewCount[channelName] = (viewCount[channelName] || 0) + 1;
    });
    const topChannels = Object.keys(viewCount)
      .sort((a, b) => viewCount[b] - viewCount[a])
      .slice(0, 5);

    const prioritizedContent = (
      await Promise.all(
        topChannels.map(channel =>
          Content.find({ channelName: channel })
            .sort({ createdAt: -1 })
            .limit(5)
        )
      )
    ).flat()
    const prioritizedIds = prioritizedContent.map(content => content._id.toString())

    let remainingContent = await Content.find({
      _id: { $nin: prioritizedIds }
    }).lean();
    remainingContent = remainingContent.sort((a, b) => b.views.length - a.views.length);
    const shuffledPrioritized = shuffleArray(prioritizedContent)
    const finalContent = [...shuffledPrioritized, ...remainingContent];
    res.status(200).json({ content: finalContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const viewVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    const historyIndex = user.history.findIndex(entry => entry.video.toString() === id);
    if (historyIndex === -1) {
      user.history.push({ video: id, channelName: content.channelName, seenAt: new Date() });
    } else {
      user.history[historyIndex].seenAt = new Date();
    }
    await user.save();
    if (!content.views.includes(user._id)) {
      content.views.push(user._id)
      await content.save()
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    if (!content.likes.includes(user._id)) {
      content.likes.push(user._id);
    } else {
      content.likes = content.likes.filter(like => like.toString() !== user._id.toString());
    }
    await content.save();
    if (!user.likedVideos.includes(id)) {
      user.likedVideos.push(id);
    } else {
      user.likedVideos = user.likedVideos.filter(videoId => videoId.toString() !== id.toString());
    }
    await user.save();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const watchLater = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!user.watchLater.includes(videoId)) {
      user.watchLater.push(videoId);
    } else {
      user.watchLater = user.watchLater.filter(videoId => videoId.toString() !== videoId.toString());
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.history = user.history.filter(h => h.video.toString() !== id.toString());
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    content.comments.push({ commentedBy: user.name, message: comment });
    await content.save();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};