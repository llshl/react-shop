import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Details';
import Card from './components/Cards';
import axios from 'axios';
import Loader from './components/Loader';

function App() {
  let [shoes, setShoes] = useState(data);
  let [showCount, setShowCount] = useState(2);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="App">
      {showCount}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate(-1); // -1만큼 페이지이동 -> 뒤로1칸가기
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      {/*Routers를 사용해서 페이지들을 만든다*/}
      <Routes>
        {/*Route를 사용해서 개별 페이지를 만든다*/}
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {
                    // 반복문으로 만들어놓은 component 생성
                    shoes.map((shoe, index) => {
                      return <Card shoes={shoe} i={++index}></Card>;
                    })
                  }
                </div>
              </div>
            </>
          }

        />
        <Route
          path="/detail/:id"
          element={
            <div>
              <Detail shoes={shoes} />
            </div>
          }
        />

        {/*Nested Route 하위페이지임, 여러 유사한 하위페이지들이 필요할 때*/}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<dev>멤버정보임</dev>} />
          <Route path="location" element={<dev>위치정보임</dev>} />
        </Route>

        <Route path="*" element={<dev>없는 페이지다 빡대가리야</dev>} />
      </Routes>
      <div>
        {loading ? (
          <Loader type="spin" color="RGB 값" message="불러오는중" />
        ) : null}
      </div>

      <Button
        onClick={() => {
          setLoading(true);
          if (showCount === 4) {
            alert('상품 이제 없다');
            return;
          }
          // 로딩바를 잘 보기위해 1초 딜레이를 줬다
          setTimeout(() => {
            axios
              .get(`https://codingapple1.github.io/shop/data${showCount}.json`)
              .then((result) => {
                setShowCount(showCount + 1);
                //setLoading(false);
                let copy = [...shoes, ...result.data];
                setShoes(copy);

                setLoading(false);
              })
              .catch((e) => {
                console.log(e);
              });
          }, 1000);
        }}
      >
        {' '}
        버튼{' '}
      </Button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      {/*nested route에서 /about/member로 접속했을때 member부분을 보여줄 부분*/}
      {/*즉, 상위페이지에서 하위페이지를 보여줄 부분*/}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
