const messageModal = require("../modal/messageModal");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    const data = await messageModal.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await messageModal
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json(projectedMessage);
  } catch (error) {
    next(error);
  }
};
