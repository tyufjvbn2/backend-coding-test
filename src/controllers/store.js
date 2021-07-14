const dataSet = require("../../stores.json");

module.exports = async (req, res) => {
  try {
    console.log("req", req.body);
    const result = dataSet.filter((data) => {
      return data.name === req.body.name;
    });

    if (result.length !== 0) {
      res.status(200).json({ data: result[0], message: "We found that data!" });
    } else {
      res
        .status(404)
        .json({ message: "There is no data which have that name" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
