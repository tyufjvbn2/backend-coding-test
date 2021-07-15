const dataSet = require("../../stores.json");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    console.log("req", req.body);
    const targetData = dataSet.filter((data) => {
      return data.postcode === req.body.postcode;
    });

    // console.log("result", targetData);

    if (targetData.length !== 0) {
      //   console.log("dld", targetData[0].postcode);
      axios
        .get(`https://api.postcodes.io/postcodes/${targetData[0].postcode}`)
        .then((result) => {
          console.log("chceck", result.data.result);
          const { longitude, latitude } = result.data.result;

          res.status(200).json({
            data: { longitude: longitude, latitude: latitude },
            message: "Store location found",
          });
        });
    } else {
      res.status(404).json({ message: "We cannot find postcode you written" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};
