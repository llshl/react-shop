import { useParams } from 'react-router-dom';
// 스타일 태그를 줄때 자바스크립트 파일 안에서 다 해결 가능
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
// 장점1. 다른 js파일에 설정한 스타일이 오염되지 않음
// 장점2. 로딩시간이 빨라진다

// App.js에만 종송되는 css파일을 만들고싶다면 파일 이름을 App.module.css로 지으면 됨

let Box = styled.div`
  padding: 20px;
  color: grey;
`;
let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: black;
  padding: 10px;
`;

function Detail(props) {
  // 이 안에 적은 코드는 Detail 컴포넌트의 라이프사이클(mount, updatem unmount)이 바뀔때마다 실행됨
  // mount, unmount는 컴포넌트가 호출될때
  // update는 재랜더링될때 -> useState로 state변수 수정 할 때
  useEffect(() => {
    // 렌더링이 다 끝나고 실행됨
    console.log('안녕');
    setTimeout(() => {
      setSecAlert(false);
    }, 2000);
  }, []); // [] 파라미터까지 넣어주면 [count]라면 count가 변할때도 useEffect를 실행해준다

  /*
  // useEffect 정리
  useEffect(() => {}); // 재렌더링마다 코드실행
  useEffect(() => {}, []); // mount시 1회 실행
  useEffect(() => {
    return () => {
      // useEffect 전에 한번 실행하고
      // unmount시 1회 실행
    };
  }, []);
  useEffect(() => {}, [count]); // mount 될 때 1회실행 + count라는 변수가 변경될때마다만 실행
*/

  console.log('그런데 useEffect 밖에 적어도 똑같이 실행된다'); // 단, 여기서 실행하게되면 렌더링 전부터 동작한다
  // 즉, HTML이 나오기도 전부터 이거를 실행하고 HTML을 렌더링하기때문에 페이지가 늦게 나온다
  // useEffect안에서 코드를 돌리면 일단 HTML을 먼저 나오게 하고 코드를 실행한다
  // 따라서 useEffect는 조금 오래걸리는 작업, 서버에서 데이터 가져오는 작업, 타이머 장착하기 등 같은 상황에서 사용한다
  let [count, setCount] = useState(0);
  let [secAlert, setSecAlert] = useState(true);
  let [num, setNum] = useState('');
  let [tab, setTab] = useState(2);

  // 현재 url의 파라미터정보가 들어옴 /:id 이거
  let { id } = useParams();
  console.log(id);
  let findOne = props.shoes.find((x) => {
    return x.id == id;
  });
  console.log(findOne);

  // 숫자만 입력하게하기
  // num이라는 변수가 수정되면 이 useEffect가 실행됨
  useEffect(() => {
    if (isNaN(num) === true) {
      alert('숫자만 입력해라');
    }
  }, [num]);

  let [fade2, setFade2] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setFade2('end');
    }, 10);
    return () => {
      setFade2('');
    };
  }, []);

  return (
    <div className={`container start ${fade2}`}>
      {
        // 2초 지나면 사라지는 div
        secAlert ? (
          <div className="alert alert-warning">2초 이내 구매시 할인!!!</div>
        ) : null
      }
      {count}
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </Button>

      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <Box>
        <YellowBtn bg={'blue'}>버튼1</YellowBtn>
        <YellowBtn bg={'orange'}>버튼2</YellowBtn>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img
            src={'https://codingapple1.github.io/shop/shoes' + id + '.jpg'}
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

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}
function TabContent(props) {
  // if(props.tab === 0){
  //     return <div>내용0</div>
  // }
  // if(props.tab === 1){
  //     return <div>내용1</div>
  // }
  // if(props.tab === 2){
  //     return <div>내용2</div>
  // }
  let [fade, setFade] = useState('');
  useEffect(() => {
    // 왜 타이머함수를 써야하나? -> 리액트의 automatic batching때문
    // state들이 변경이 여러번될때 다 변경되고 마지막 변경이 끝나면 재랜더링하기때문
    // 우리는 state들이 변경될때마다 재랜더링을 해야하기에 타이머함수로 강제로 랜더링을 돌려준 것
    setTimeout(() => {
      setFade('end');
    }, 10);
    return () => {
      // useEffect가 실행되기 전에 실행됨(beforeEach)
      setFade('');
    };
  }, [props.tab]); // tab state가 변할때마다 실행됨
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>
  ); // if문 안쓰고 배열 인덱스로 접근해도 됨
}

export default Detail;
