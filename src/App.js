import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Editpage from "./components/Editpage";
import { Footer } from "flowbite-react";
import { Button, Navbar } from "flowbite-react";
import logoImage from "../src/Images/Kulla_e_shqiponjës-removebg-preview.png";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Router>
        <Navbar fluid rounded style={{ backgroundColor: '#601700' }} className="text-white">
          <Navbar.Brand>
            <img src={logoImage} className="mr-3 h-9 sm:h-9" alt="Flowbite React Logo" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="ml-auto" style={{ marginLeft: "-2px" }}>
            <Navbar.Link href="/home" className="text-white hover:text-gray-300">Home</Navbar.Link>
            <Navbar.Link href="/menu" className="text-white hover:text-gray-300">Services</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/editpage/:firebaseId" element={<Editpage />} />
        </Routes>

        <Footer container style={{ backgroundColor: '#601700' }} className="d-flex flex-column justify-content-center align-items-center text-center text-white mt-auto">
            <Footer.Copyright href="#" by="Kulla e Shqiponjes" year={2024} />
            <Footer.LinkGroup>
                <Footer.Link href="tel:+38344363446">Phone: +(383)44-363-446</Footer.Link>
                <Footer.Link href="tel:+38346180741">Phone: +(383)46-180-741</Footer.Link>
                <Footer.Link href="https://www.facebook.com/p/Restaurant-Kulla-e-Shqiponjes-100063280745663/" target="_blank" rel="noopener noreferrer">
                    Facebook
                </Footer.Link>
            </Footer.LinkGroup>
        </Footer>

      </Router>
    </div>
  );
}

export default App;
