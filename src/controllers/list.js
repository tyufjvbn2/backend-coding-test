const dataSet = require("../../stores.json");

module.exports = async (req, res) => {
  try {
    res
      .status(200)
      .json({ data: dataSet, message: "Datalist received successfully" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
