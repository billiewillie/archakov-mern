import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    // можно передать информацию о пользователе, не только id
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'cannot get posts'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $inc: {
        viewsCount: 1
      }
    }, {
      returnDocument: 'after'
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'cannot get a post'
        })
      }
      if (!doc) {
        return res.status(404).json({
          message: 'no post'
        })
      }

      res.json(doc)
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'cannot get a post'
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    res.json({
      success: true
    })
  } catch (err) {
    res.status(500).json({
      message: 'cannot update a post'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findByIdAndDelete({
      _id: postId
    }, (err, doc) => {

      if (err) {
        return res.status(500).json({
          message: 'could not delete a post'
        })
      }

      if (!doc) {
        return res.status(404).json({
          message: 'no post'
        })
      }

      return res.json({
        message: 'deleted',
      })
    })
  } catch (err) {
    res.status(500).json({
      message: 'cannot get posts'
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save();

    res.json(post)
  } catch (err) {
    res.status(500).json({
      message: 'failed to create a post'
    })
  }
}
