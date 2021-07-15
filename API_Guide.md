### API

\*현재 서버는 **local**에서 실행되고 있습니다
포트는 **3030** 입니다

**서버 실행시 url**
**ex)http://localhost:3030**

1.  **전체 리스트를 가져오고 싶을 때**

    > request

        url     : /list
        method  : GET

    > response

        status  : 200
        data    : [{"name":"지역명1", "postcode": "우편번호1"}, {"name":"지역명2", "postcode": "우편번호2"}, {"name":"지역명3", "postcode": "우편번호3"}, ....]
        message : "Datalist received successfully"

2.  **지역명으로 데이터를 찾을 때**

    > request

        url     : /place
        method  : POST
        body    : {"name" : "지역명"}

    > response

        status  : 200
        data    : {"name":"지역명", "postcode": "우편번호"}
        message : "We found that data!"

3.  **우편번호로 지역의 위치를 찾을 때**

    > request

        url     : /location
        method  : POST
        body    : {"postcode" : "우편번호"}

    > response

        status  : 200
        data    : {"longitude":"경도값", "latitude": "위도값"}
        message : "Postcode location found"

4.  **우편번호와 거리 범위로 주변 지역의 위치를 찾을 때**

    > request

        url     : /search
        method  : POST
        body    : {"postcode" : "우편번호", "radius" : "km값"}

    > response

        status  : 200
        data    : [{"name":"지역명1", "postcode": "우편번호1"}, {"name":"지역명2", "postcode": "우편번호2"}, {"name":"지역명3", "postcode": "우편번호3"}, ....]
        message : "We found location list within this radius ordered from north"
