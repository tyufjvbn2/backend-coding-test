const dataSet = require("../../stores.json");
const axios = require("axios");
const geolib = require("geolib");

module.exports = async (req, res) => {
  try {
    //요청 확인
    console.log("req", req.body);
    //입력값 데이터셋에 존재하는지 확인
    const targetData = dataSet.filter((data) => {
      return data.postcode === req.body.postcode;
    });

    //입력값이 데이터셋에 존재할때
    if (targetData.length !== 0) {
      //데이터셋에서 입력값만 제외한 배열
      const newDataSet = dataSet.filter((data) => {
        return data.postcode !== req.body.postcode;
      });

      //위치 중심점
      let targetLocation = await axios
        .get(`https://api.postcodes.io/postcodes/${targetData[0].postcode}`)
        .then((result) => {
          return {
            longitude: result.data.result.longitude,
            latitude: result.data.result.latitude,
          };
        })
        .catch((err) => {
          //없는 postcode일때 undefined 처리
          return;
        });
      //   console.log("target location", targetLocation);

      //세상에 존재하는 postcode 일때
      if (targetLocation !== undefined) {
        //데이터셋 내의 값들 위치 찾기 위한 요청
        let dataPromiseSet = await newDataSet.map((data) => {
          return axios
            .get(`https://api.postcodes.io/postcodes/${data.postcode}`)
            .then((result) => {
              return {
                name: data.name,
                postcode: data.postcode,
                longitude: result.data.result.longitude,
                latitude: result.data.result.latitude,
              };
            });
        });

        //postcode로 위치 찾은 결과 전체
        let withLocationList = await Promise.allSettled(dataPromiseSet).then(
          (output) => {
            return output;
          }
        );

        //존재하는 postcode만 모은 배열
        let trimmedList = withLocationList.filter((data) => {
          return data.status === "fulfilled";
        });

        //범위 내 store 찾기
        let withDistance = trimmedList.filter((data) => {
          const { longitude, latitude } = data.value;
          return (
            geolib.getDistance(targetLocation, {
              longitude: longitude,
              latitude: latitude,
            }) <=
            req.body.radius * 1000
          );
        });

        //북쪽부터 정렬
        let orderedList = withDistance.sort((a, b) => {
          if (a.value.latitude > b.value.latitude) {
            return -1;
          }
          if (a.value.latitude < b.value.latitude) {
            return 1;
          }
          return 0;
        });

        //   console.log("정렬되었나", orderedList);

        //데이터셋에 맞게 배열 수정
        let resultList = orderedList.map(({ value: { name, postcode } }) => {
          return { name, postcode };
        });

        //   console.log("북쪽부터", resultList);

        res.status(200).json({
          data: resultList,
          message: "We found store list within this radius from north",
        });
      } else {
        //세상에 존재하지 않는 postcode일때
        res.status(400).json({ message: "You send wrong postcode" });
      }
    } else {
      //입력값이 데이터셋에 존재하지 않을때
      res
        .status(400)
        .json({ message: "There is no postcode you written in stores" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
