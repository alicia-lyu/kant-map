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
import {UserMenu, LogInPrompt} from "./App.UserItemInNav";

function App() {

  // how to toggle between logged-in and logged-out states?
  const NavRight = (
    <Routes>
      <Route element={<UserMenu />} /> 
      <Route element={<LogInPrompt />} /> 
    </Routes>
  )
// routes in the back-end to be added
  const NavbarWithLinks = (
    <Navbar bg="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home">KantMap</Navbar.Brand>
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
            <NavRight />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  // more routes to be added
  const MainContent = (
    <div className="container mt-3">
      <Routes>
        <Route path="/terms" element={<Terms />} /> 
        <Route path="/term/:termName" element={<Term />} />
        <Route path="/:termName/sentences" element={<Sentences />} />
        <Route path="/:termName/:sentenceId" element={<Sentence />} />
        <Route path="/:termName/add-sentence" element={<AddSentence />} />
      </Routes>
    </div>
  )

  return (
    <Router>
      <NavbarWithLinks />
      <MainContent />
    </Router>
  )
}

export default App