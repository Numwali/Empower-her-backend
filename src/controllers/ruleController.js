import Rule from "../models/Rule";

const createRule = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ message: "name is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ message: "Description is required" });
    }

    const rule = new Rule({
      name,
      description,
    });
    await rule.save();
    return res.status(201).json({ rule });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getRule = async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await Rule.findById(id);
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }
    return res.status(200).json({ rule });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    return res.status(200).json({ rules });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ message: "Description is required" });
    }

    const newRule = await Rule.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );
    return res.status(200).json({ newRule });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteRule = async (req, res) => {
  try {
    const { id } = req.params;

    await Rule.findByIdAndDelete(id);
    return res.status(200).json({ message: "Rule deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { createRule, getRule, getAllRules, updateRule, deleteRule };
