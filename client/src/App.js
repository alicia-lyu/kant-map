import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.scss';

// import Components
import Home from './components/Home/Home'
import Terms from "./components/Terms/Terms";
import Term from './components/Term/Term'
import AddSentence from "./components/AddSentence/AddSentence";
import UserItemInNav from "./components/UserItemInNav";

function App() {


  // routes in the back-end to be added
  const NavbarWithLinks = () => (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container className="container-fluid">
        <Navbar.Brand>
          <Link to={"/"} className="nav-link">
            KantMap
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to={"/terms"} className="nav-link">
                Terms
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/lists"} className="nav-link">
                Lists
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <UserItemInNav />
      </Container>
    </Navbar>
  )

  // more routes to be added
  const MainContent = () => (
    <Container className="mt-5 pb-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/:termName/sentences" element={<Term />} />
        <Route path="/:termName/add-sentence" element={<AddSentence />} />
      </Routes>
    </Container>
  )

  return (
    <Router>
      <NavbarWithLinks />
      <MainContent />
    </Router>
  )
}

export default App