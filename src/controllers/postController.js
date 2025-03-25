import Post from "../models/post.js";
import imageUploader from "../helpers/photoUpload.js";
import videoUploader from "../helpers/videoUploader.js";

export const createPost = async (req, res) => {
  try {
    const { user } = req;
    const { content } = req.body;
    if (!content || content == "")
      return res
        .status(200)
        .json({ success: false, message: "content is required" });

    let image = "";
    if (req.files && req.files.image != null && req.files.video == null) {
      image = await imageUploader(req);
      image = image.url;
    }

    let video = "";
    if (req.files && req.files.video && !req.files.image) {
      video = await videoUploader(req);
      video = video.url;
    }

    const post = new Post({
      user: user._id,
      content,
      image,
      video,
      type: "blog",
    });
    const newPost = await post.save();
    res.status(201).json({
      success: true,
      post: {
        id: newPost._id,
        content,
        image: newPost.image,
        video: newPost.video,
        comments: newPost.comments,
        postedDate: newPost.postedDate,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({
//       type: "blog",
//     })
//       .populate("user", "-password")
//       .populate("comments.user", "-password")
//       .populate("likes.user", "-password")
//       .sort({ _id: -1 });
//     res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error });
//   }
// };

export const getAllPosts = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const posts = await Post.find({
      type: "blog",
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            select: "-password",
          },
          {
            path: "replies",
            populate: {
              path: "user",
              select: "-password",
            },
          },
        ],
      })
      .populate("likes.user", "-password")
      .sort({ _id: -1 })
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records returned

    res.status(200).json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(
        (await Post.countDocuments({ type: "blog" })) / limit
      ),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const getMyPosts = async (req, res) => {
//   const { user } = req;
//   try {
//     const posts = await Post.find({
//       user: user._id,
//       type: "blog",
//     })
//       .populate("user", "-password")
//       .populate("comments.user", "-password")
//       .populate("likes.user", "-password")
//       .sort({ _id: -1 });
//     res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error });
//   }
// };

export const getMyPosts = async (req, res) => {
  const { user } = req;
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const posts = await Post.find({
      user: user._id,
      type: "blog",
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            select: "-password",
          },
          {
            path: "replies",
            populate: {
              path: "user",
              select: "-password",
            },
          },
        ],
      })
      .populate("likes.user", "-password")
      .sort({ _id: -1 })
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records returned

    res.status(200).json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(
        (await Post.countDocuments({ user: user._id, type: "blog" })) / limit
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "likes.user",
        select: "-password",
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            select: "-password",
          },
          {
            path: "replies",
            populate: {
              path: "user",
              select: "-password",
            },
          },
        ],
      });
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { user } = req;
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content == "")
      return res
        .status(200)
        .json({ success: false, message: "content is required" });

    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res
        .status(200)
        .json({ success: false, message: "post doesn't exist" });
    }
    if (
      postExist.user.toString().replace(/ObjectId\("(.*)"\)/, "$1") !=
      user._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
    ) {
      return res
        .status(200)
        .json({ success: false, message: "this post doesn't belong to you" });
    }

    postExist.content = content;
    if (req.files) {
      const image = await imageUploader(req);
      postExist.image = image.url;
    }

    if (req.files && req.files.video && !req.files.image) {
      video = await videoUploader(req);
      postExist.video = video.url;
    }

    await postExist.save();

    return res.status(200).json({
      success: true,
      message: "post updated successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { user } = req;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(200)
        .json({ success: false, message: "post doesn't exist" });

    if (
      post.user.toString().replace(/ObjectId\("(.*)"\)/, "$1") !=
      user._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
    )
      return res
        .status(200)
        .json({ success: false, message: "this post doesn't belong to you" });

    await Post.deleteOne({ _id: postId });
    res.status(200).json({
      success: true,
      message: "Post deleted successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const commentingOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { user } = req;
    const { comment } = req.body;
    if (!comment || comment == "")
      return res
        .status(200)
        .json({ success: false, message: "comment is required!" });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(200)
        .json({ success: false, message: "Invalid post id" });

    const newComment = {
      user: user._id,
      comment,
      postedDate: new Date(),
    };

    post.comments.push(newComment);
    post.save().then(async (result) => {
      if (result) {
        const post = await Post.findById(result._id)
          .populate({
            path: "user",
            select: "-password",
          })
          .populate({
            path: "likes.user",
            select: "-password",
          })
          .populate({
            path: "comments",
            populate: [
              {
                path: "user",
                select: "-password",
              },
              {
                path: "replies",
                populate: {
                  path: "user",
                  select: "-password",
                },
              },
            ],
          });

        return res.status(200).json({
          success: true,
          post,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const replyingToComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { user } = req;
    const { reply } = req.body;

    // Check if reply is provided and not empty
    if (!reply || reply === "")
      return res
        .status(400)
        .json({ success: false, message: "Reply is required!" });

    // Find the post
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    // Find the comment within the post
    const comment = post.comments.id(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    // Create a new reply object
    const newReply = {
      user: user._id,
      reply,
      postedDate: new Date(),
    };

    // Push the reply to the replies array within the comment
    comment.replies.push(newReply);

    // Save the post
    await post.save();

    // Fetch the updated post with populated user details and comments
    const updatedPost = await Post.findById(postId)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "likes.user",
        select: "-password",
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            select: "-password",
          },
          {
            path: "replies",
            populate: {
              path: "user",
              select: "-password",
            },
          },
        ],
      });

    // Return the updated post
    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    // Handle errors
    console.error("Error replying to comment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const user_id = req.user._id;

  Post.findById(postId)
    .then(async (post) => {
      if (post) {
        const found = post.likes.some(
          (el) => el.user.toString() === user_id.toString()
        );
        if (found) {
          post.likes = post.likes.filter(
            (item) => item.user.toString() !== user_id.toString()
          );
        } else {
          post.likes.push({ user: user_id });
          await post.save();
        }
        post
          .save()
          .then(async (result) => {
            if (result) {
              const post = await Post.findById(result._id)
                .populate({
                  path: "user",
                  select: "-password",
                })
                .populate({
                  path: "likes.user",
                  select: "-password",
                })
                .populate({
                  path: "comments",
                  populate: [
                    {
                      path: "user",
                      select: "-password",
                    },
                    {
                      path: "replies",
                      populate: {
                        path: "user",
                        select: "-password",
                      },
                    },
                  ],
                });

              return res.status(200).json({
                success: true,
                post,
              });
            }
          })
          .catch((error) => res.status(500).json({ error: error.message }));
      } else res.status(404).json({ error: "post doesn't exist" });
    })
    .catch((error) => res.json({ error: error.message }));
};


export const getMyLikedPosts = async (req, res) => {
  const { user } = req;
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const posts = await Post.find({
      "likes.user": user._id, // Match posts where the user has liked
      type: "blog",
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            select: "-password",
          },
          {
            path: "replies",
            populate: {
              path: "user",
              select: "-password",
            },
          },
        ],
      })
      .populate("likes.user", "-password")
      .sort({ _id: -1 })
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records returned

    res.status(200).json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(
        (await Post.countDocuments({
          "likes.user": user._id,
          type: "blog",
        })) / limit
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

