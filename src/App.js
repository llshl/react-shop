import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import {useState} from "react";
import data from './data';

function App() {

    let [shoes] = useState(data)
  return (
    <div className="App">
      <Button variant="primary">Primary</Button>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <div className="main-bg"></div>
        <div className="container">
            <div className="row">
                {
                    // 반복문으로 만들어놓은 component 생성
                    shoes.map((shoe, index) => {
                        return (<Card shoes={shoe} i={++index}></Card>)
                    })
                }
            </div>
        </div>
    </div>
  );
}

// component
function Card(props){
    return(
        <div className="col-md-4">
            <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </div>
    )
}

export default App;
