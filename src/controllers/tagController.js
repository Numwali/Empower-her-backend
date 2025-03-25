import Tag from "../models/Tag";

const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const tag = new Tag({
      name,
    });
    await tag.save();
    return res.status(201).json({ tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json({ tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json({ tags });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const newTag = await Tag.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );
    return res.status(200).json({ newTag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    await Tag.findByIdAndDelete(id);
    return res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { createTag, getTag, getAllTags, updateTag, deleteTag };
