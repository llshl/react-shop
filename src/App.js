import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Details';
import Card from './components/Cards';

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
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
          path="/detail"
          element={
            <div>
              <Detail />
            </div>
          }
        />

          {/*Nested Route 하위페이지임, 여러 유사한 하위페이지들이 필요할 때*/}
          <Route path="/about" element={<About/>}>
              <Route path="member" element={<dev>멤버정보임</dev>} />
              <Route path="location" element={<dev>위치정보임</dev>} />
          </Route>

          <Route path="*" element={<dev>없는 페이지다 빡대가리야</dev>} />
      </Routes>
    </div>
  );
}

function About(){
    return(
        <div>
            <h4>회사정보임</h4>
            {/*nested route에서 /about/member로 접속했을때 member부분을 보여줄 부분*/}
            {/*즉, 상위페이지에서 하위페이지를 보여줄 부분*/}
            <Outlet></Outlet>
        </div>
    )
}

export default App;
