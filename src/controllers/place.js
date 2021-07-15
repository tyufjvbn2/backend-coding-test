const dataSet = require("../../stores.json");

module.exports = async (req, res) => {
  try {
    //특정 place이름 검색
    const targetData = dataSet.filter((data) => {
      return data.name === req.body.name;
    });

    //해당 place가 stores안에 존재할때
    if (targetData.length !== 0) {
      res
        .status(200)
        .json({ data: targetData[0], message: "We found that data!" });
    } else {
      //해당 place가 stores안에 존재하지 않을때
      res
        .status(404)
        .json({ message: "There is no data which have that name" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};
