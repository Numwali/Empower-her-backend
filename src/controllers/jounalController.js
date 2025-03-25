
//  Add a new journal entry

import Journal from "../models/Jounal";

export const addEntry = async (req, res) => {
  try {
    const { title, content, emotions, actions, isPrivate } = req.body;
    const userId = req.user._id;

    const journal = new Journal({
      userId,
      title,
      content,
      emotions,
      actions,
      isPrivate,
    });

    await journal.save();
    res.status(201).json({ message: "Journal entry added successfully", journal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing journal entry

export const updateEntry = async (req, res) => {
  try {
    const { journalId } = req.params;
    const { title, content, emotions, actions, isPrivate } = req.body;
    const userId = req.user._id;
    const journal = await Journal.findOne({ _id: journalId, userId });
    if (!journal) return res.status(404).json({ message: "Journal entry not found" });

    journal.title = title || journal.title;
    journal.content = content || journal.content;
    journal.emotions = emotions || journal.emotions;
    journal.actions = actions || journal.actions;
    journal.isPrivate = isPrivate !== undefined ? isPrivate : journal.isPrivate;

    await journal.save();
    res.status(200).json({ message: "Journal entry updated successfully", journal });
  } catch (error) {
    res.status(500).json({ message: "Failed to update journal entry", error: error.message });
  }
};


// Delete a journal entry

export const deleteEntry = async (req, res) => {
  try {
    const { journalId } = req.params;
    const userId = req.user._id;

    const journal = await Journal.findOneAndDelete({ _id: journalId, userId });
    if (!journal) return res.status(404).json({ message: "Journal entry not found" });

    res.status(200).json({ message: "Journal entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete journal entry", error: error.message });
  }
};


// View all journal entries of the logged-in user

export const viewMyJournals = async (req, res) => {
  try {
    const userId = req.user._id;
    const journals = await Journal.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ journals });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve journals", error: error.message });
  }
};


// View all public (not private) journal entries

export const viewPublicJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ isPrivate: false }).sort({ createdAt: -1 });

    res.status(200).json({ journals });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve public journals", error: error.message });
  }
};
