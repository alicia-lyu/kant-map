import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { logout } from "../slices/auth.slice";
import authService from "../services/auth/auth.service";
import { withRoutes } from "../hooks/withRoutes";

import withErrorHandler from "../hooks/withErrorHandler";

class UserItemInNav extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        try {
            authService.logout()
            // this.props.navigate()
        } catch (error) {
            this.props.errorHandler(error)
        }
    }

    render() {

        const UserItemLoggedIn = () => (
            <Nav.Item className="dropdown d-flex">
                <Link to={"/profile"} className="nav-link">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
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
                        <button onClick={this.handleLogout} className="dropdown-item">Log Out</button>
                    </li>
                </NavDropdown>
            </Nav.Item>
        )

        const UserItemLoggedOut = () => (
            <Nav className="d-flex">
                <Nav.Item>
                    <Link to={"/auth/login"} className="nav-link">
                        Log In
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to={"/auth/signup"} className="nav-link">
                        Sign Up
                    </Link>
                </Nav.Item>
            </Nav>
        )

        if (this.props.isLoggedIn === true) {
            return <UserItemLoggedIn />
        } else {
            return <UserItemLoggedOut />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRoutes(UserItemInNav)))