import {BrowserRouter as Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// routes in the back-end to be added
export function UserMenu() {
    <Nav.Item className="dropdown d-flex">
        <Nav.Link href="#">
            <FontAwesomeIcon icon={faUser} />
        </Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <li>
                <Link to={"/my-lists"} className="dropdown-item">My Lists</Link>
            </li>
            <li>
                <Link to={"/my-posts"} className="dropdown-item">My Posts</Link>
            </li>
            <li>
                <Link to={"/profile"} className="dropdown-item">Profile</Link>
            </li>
            <li>
                <Link to={"/log-out"} className="dropdown-item">Log Out</Link>
            </li>
        </NavDropdown>
    </Nav.Item>
}

export function LogInPrompt() {
    <Nav.Item className="dropdown d-flex">
        <Link to={"/log-in"}>Log In</Link>
    </Nav.Item>
}