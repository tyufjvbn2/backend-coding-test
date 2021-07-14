const data = require("../../stores.json");

module.exports = async (req, res) => {
  try {
    res.status(200).json({ message: "working well" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
