import { useParams } from 'react-router-dom';
// 스타일 태그를 줄때 자바스크립트 파일 안에서 다 해결 가능
import styled from 'styled-components'
// 장점1. 다른 js파일에 설정한 스타일이 오염되지 않음
// 장점2. 로딩시간이 빨라진다

// App.js에만 종송되는 css파일을 만들고싶다면 파일 이름을 App.module.css로 지으면 됨

let Box = styled.div`
  padding : 20px;
  color : grey
`;
let YellowBtn = styled.button`
  background : ${ props => props.bg};
  color : black;
  padding : 10px;
`;

function Detail(props) {
  let { id } = useParams(); // 현재 url의 파라미터정보가 들어옴 /:id 이거
  console.log(id)
  let findOne = props.shoes.find((x) => {
    return x.id == id;
  });
  console.log(findOne)
  return (
    <div className="container">
      <Box>
        <YellowBtn bg={"blue"}>버튼1</YellowBtn>
        <YellowBtn bg={"orange"}>버튼2</YellowBtn>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + id + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findOne.title}</h4>
          <p>{findOne.content}</p>
          <p>{findOne.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
