const dataSet = require("../../stores.json");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    //데이터셋에서 해당 postcode검색
    const targetData = dataSet.filter((data) => {
      return data.postcode === req.body.postcode;
    });

    //데이터셋 내에 postcode가 존재할 때
    if (targetData.length !== 0) {
      //위치를 찾는 axios요청
      let targetLocation = await axios
        .get(`https://api.postcodes.io/postcodes/${targetData[0].postcode}`)
        .then((result) => {
          //postcode검색 결과가 존재할 때
          const { longitude, latitude } = result.data.result;
          return { longitude: longitude, latitude: latitude };
        })
        .catch((err) => {
          //없는 postcode일때 undefined 처리
          return;
        });

      //존재하는 postcode일때
      if (targetLocation !== undefined) {
        res.status(200).json({
          data: targetLocation,
          message: "Postcode location found",
        });
      } else {
        //존재하지 않는 postcode 일때
        res.status(400).json({ message: "You send wrong postcode" });
      }
    } else {
      //데이터셋 내에 postcode가 존재하지 않을 때
      res.status(404).json({ message: "We cannot find postcode you written" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};
