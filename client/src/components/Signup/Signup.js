import React from "react";
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'

import { signup } from "../../slices/auth.slice";
import { clearMessage } from "../../slices/message.slice";

import withRouter from '../../hooks/withRouter'

import FormikForm from "./FormikForm.js";
import DisplayMessage from "../common/DisplayMessage";
import validationSchema from "./validationSchema";

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.handleSignup = this.handleSignup.bind(this)
    }

    componentDidMount() {
        this.props.clearMessage();
    }

    handleSignup(formValue) {
        const { username, password, email } = formValue;
        this.setState({ loading: true });
        this.props.signup(username, password, email)
            .unwrap().then(() => {
                this.props.navigate('/auth/login')
                window.location.reload();
            }).catch(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const initialValues = { username: "", password: "", email: "" }

        return (
            <div>
                <Card>
                    <div className="card-body">
                        <h5 class="card-title">Sign Up</h5>
                        <FormikForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            handleSignup={this.handleSignup}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (username, password, email) => { dispatch(signup({ username, password, email })) },
        clearMessage: () => { dispatch(clearMessage()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));

