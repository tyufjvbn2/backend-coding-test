const dataSet = require("../../stores.json");

module.exports = async (req, res) => {
  try {
    //정상 응답
    res
      .status(200)
      .json({ data: dataSet, message: "Datalist received successfully" });
  } catch (err) {
    //에러 상황일때
    console.error(err);
    res.status(400).json({ message: err });
  }
};
