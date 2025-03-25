import Community from "../models/Community";
import Post from "../models/post.js";
import User from "../models/userModel.js";
import imageUploader from "../helpers/photoUpload.js";

const createCommunity = async (req, res) => {
  try {
    const { user } = req;
    const { name, description, privacy } = req.body;

    // Handle members field
    const members = req.body.members ? req.body.members.split(",") : [];

    // Validate required fields
    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ message: "Description is required" });
    }

    // Initialize the community with the creator as the first member
    const initialMembers = new Set([user._id.toString()]);

    // Validate and add additional members
    if (members && Array.isArray(members)) {
      for (const memberId of members) {
        // Skip empty or invalid memberId values
        if (!memberId || !mongoose.Types.ObjectId.isValid(memberId)) {
          continue;
        }

        // Check if each member exists
        const memberExists = await User.findById(memberId);
        if (memberExists) {
          initialMembers.add(memberId.toString());
        } else {
          return res.status(400).json({ message: `User not found: ${memberId}` });
        }
      }
    }

    // Validate privacy field
    if (privacy && privacy !== "") {
      if (privacy !== "public" && privacy !== "private") {
        return res.status(400).json({ message: "Invalid privacy setting" });
      }
    }

    // Handle image upload
    let image = "";
    if (req.files) {
      image = await imageUploader(req);
      image = image.url;
    }

    // Create the community
    const community = new Community({
      name,
      description,
      profileImage: image,
      creator: user._id,
      privacy,
      members: Array.from(initialMembers), // Ensure members is an array of valid ObjectIds
    });

    await community.save();
    return res.status(201).json({ community });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    // Extract limit from query parameter
    const community = await Community.findById(id)
      .populate(
        "creator",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate(
        "members",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate(
        "pendingMembers",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate("posts", "title")
      .populate("rules", "name")
      .populate("tags", "name");

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    return res.status(200).json({
      community,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const { user } = req; // Extract limit from query parameter

    const userCommunities = await Community.find({
      members: { $in: [user._id] },
    });
    const userCommunityIds = userCommunities.map((community) => community._id);

    const communities = await Community.find({
      _id: { $nin: userCommunityIds },
    })
      .populate(
        "creator",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate(
        "members",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate(
        "pendingMembers",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate("posts")
      .populate("rules", "name")
      .populate("tags", "name"); // Limit the number of records returned
    return res.status(200).json({
      communities,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyCommunities = async (req, res) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const communities = await Community.find({ members: user._id })
      .populate(
        "creator",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate(
        "members",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate(
        "pendingMembers",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "-password" },
          { path: "comments.user", select: "-password" },
          { path: "likes.user", select: "-password" },
        ],
      })
      .populate("rules", "name")
      .populate("tags", "name")
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records returned

    return res.status(200).json({
      communities,
      currentPage: page,
      totalPages: Math.ceil(
        (await Community.countDocuments({ members: user._id })) / limit
      ),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getCommunitiesCreatedByMe = async (req, res) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const communities = await Community.find({ creator: user._id })
      .populate("creator", "firstname lastname username profileImage")
      .populate(
        "members",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "-password" },
          { path: "comments.user", select: "-password" },
          { path: "likes.user", select: "-password" },
        ],
      })
      .populate("rules", "name")
      .populate("tags", "name")
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records returned

    return res.status(200).json({
      communities,
      currentPage: page,
      totalPages: Math.ceil(
        (await Community.countDocuments({ creator: user._id })) / limit
      ),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getCommunitiesJoinedByMe = async (req, res) => {
  try {
    const { user } = req;
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const communities = await Community.find({
      members: user._id,
      creator: { $ne: user.id }, // Exclude communities where user is the creator
    })
      .populate("creator", "firstname lastname username profileImage")
      .populate(
        "members",
        "-password -verificationToken -createdAt -updatedAt -__v"
      )
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "-password" },
          { path: "comments.user", select: "-password" },
          { path: "likes.user", select: "-password" },
        ],
      })
      .populate("rules", "name")
      .populate("tags", "name")
      .skip((page - 1) * limit) // Skip records based on pagination
      .limit(limit); // Limit the number of records returned

    return res.status(200).json({
      communities,
      currentPage: page,
      totalPages: Math.ceil(
        (await Community.countDocuments({ members: user._id })) / limit
      ),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateCommunity = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, description } = req.body;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.creator.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this community" });
    }
    if (name && name !== "") {
      community.name = name;
    }
    if (description && description !== "") {
      community.description = description;
    }
    await community.save();
    return res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.creator.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this community" });
    }
    await community.delete();
    return res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.members.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "You are already a member of this community" });
    }
    if (community.privacy === "private") {
      if (community.pendingMembers.includes(user._id)) {
        return res.status(400).json({
          message: "You have already sent a request to join this community",
        });
      }
      community.pendingMembers.push(user._id);
      community.save();
      return res.status(200).json({
        message:
          "This community is private, your requist to join have been sent to the admin",
      });
    }
    community.members.push(user._id);
    await community.save();
    return res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getPendingMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.creator.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view pending members" });
    }
    return res.status(200).json({ pendingMembers: community.pendingMembers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const approvePendingMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { userId } = req.body;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.creator.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to approve members" });
    }
    if (!community.pendingMembers.includes(userId)) {
      return res.status(400).json({
        message: "This user is not a pending member of this community",
      });
    }
    community.pendingMembers = community.pendingMembers.filter(
      (member) => member.toString() !== userId.toString()
    );
    community.members.push(userId);
    await community.save();
    return res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const rejectPendingMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { userId } = req.body;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.creator.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to reject members" });
    }
    if (!community.pendingMembers.includes(userId)) {
      return res.status(400).json({
        message: "This user is not a pending member of this community",
      });
    }
    community.pendingMembers = community.pendingMembers.filter(
      (member) => member.toString() !== userId.toString()
    );
    await community.save();
    return res
      .status(200)
      .json({ message: "member rejected successfuly", community });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const leaveCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (!community.members.includes(user._id)) {
      return res

        .status(400)
        .json({ message: "You are not a member of this community" });
    }
    community.members = community.members.filter(
      (member) => member.toString() !== user._id.toString()
    );
    await community.save();
    return res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { content } = req.body;
    if (!content || content === "") {
      return res.status(400).json({ message: "Content is required" });
    }
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (!community.members.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "You are not a member of this community" });
    }
    let image = "";
    if (req.files) {
      image = await imageUploader(req);
      image = image.url;
    }

    const post = await new Post({
      user: user._id,
      content,
      image,
      type: "community",
    });
    await post.save();
    community.posts.push(post._id);
    await community.save();
    return res.status(201).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getCommunityPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter

    const community = await Community.findById(id).populate({
      path: "posts",
      populate: [
        { path: "user", select: "-password" },
        { path: "comments.user", select: "-password" },
        { path: "likes.user", select: "-password" },
      ],
      options: {
        sort: { _id: -1 }, // Sort posts by _id in descending order
        skip: (page - 1) * limit, // Skip records based on pagination
        limit: limit, // Limit the number of records returned
      },
    });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const posts = community.posts;
    return res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(posts.length / limit),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { userId } = req.body;
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (!community.members.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "You are not a member of this community" });
    }
    if (community.members.includes(userId)) {
      return res
        .status(400)
        .json({ message: "This user is already a member of this community" });
    }
    community.members.push(userId);
    await community.save();
    return res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  createCommunity,
  getCommunity,
  getAllCommunities,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  addPost,
  getCommunityPosts,
  approvePendingMember,
  rejectPendingMember,
  getPendingMembers,
  getMyCommunities,
  addMember,
  getCommunitiesJoinedByMe,
  getCommunitiesCreatedByMe,
};
