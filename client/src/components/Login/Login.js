import React from "react";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as Yup from "yup";
import Card from 'react-bootstrap/Card'

import { login } from "../../slices/auth.slice";
import { clearMessage } from "../../slices/message.slice";

import withRouter from '../../hooks/withRouter'

import FormikForm from "./FormikForm";
import DisplayMessage from "../common/DisplayMessage";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    componentDidMount() {
        this.props.clearMessage();
    }

    handleLogin(formValue) {
        const { username, password } = formValue;
        this.setState({ loading: true });
        this.props.login(username, password)
            .unwrap().then(() => {
                this.props.navigate('/profile')
                window.location.reload();
            }).catch(() => {
                setLoading(false);
            });
    }

    render() {
        if (this.props.isLoggedIn === true) {
            return <Navigate to="/profile" />;
        }

        const initialValues = { username: "", password: "" }
        const validationSchema = Yup.object().shape({
            username: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
        });


        return (
            <div>
                <Card>
                    <div className="card-body">
                        <h5 class="card-title">Log In</h5>
                        <FormikForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            handleLogin={this.handleLogin}
                            loading={this.state.loading}
                        />
                    </div>
                </Card>
                <DisplayMessage message={this.props.message} />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message.message,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => { dispatch(login({ username, password })) },
        clearMessage: () => { dispatch(clearMessage()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

