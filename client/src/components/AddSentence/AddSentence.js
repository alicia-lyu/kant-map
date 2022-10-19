import React from "react";
import { connect } from "react-redux";
import withRoutes from "../../hooks/withRoutes";
import withParams from "../../hooks/withParams";
import { clearMessage } from "../../slices/message.slice";
import handleError from "../../hooks/useErrorHandler";
import sentenceService from "../../services/sentence.service";
import FormikForm from "./FormikForm";
import TermInfo from "../common/TermInfo";


class AddSentence extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formValue) {
        const { text } = formValue;
        const termName = this.props.params.termName;
        this.setState({ loading: true });
        try {
            const res = sentenceService.add(termName, text)
            this.props.navigate(`/${termName}/sentences`)
        } catch (error) {
            handleError(error)
        }
    }

    render() {
        const termName = this.props.params.termName;
        const initialValues = { text: "" };
        return (
            <div id="add-sentence">
                <TermInfo term={termName} />
                <FormikForm
                    initialValues={initialValues}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(clearMessage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withRoutes(AddSentence)))