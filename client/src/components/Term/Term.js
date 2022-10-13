import React from "react";
import withParams from "../../hooks/withParams";
import sentenceService from "../../services/sentence.service";
import SentenceCard from "./SentenceCard";
import TermInfo from "./TermInfo";


class Term extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: undefined,
            sentences: []
        }
    }

    componentDidMount() { // connect react-router and axios
        const res = sentenceService.getAll(props.params.termName);
        const termDocument = res.termDocument;
        const sentences = res.sentences;
        this.setState({
            term: termDocument,
            sentences
        })
    }

    render() {
        const term = this.state.term
        const sentences = this.state.sentences
        const SentenceCards = sentences.map((sentence) => {
            return <SentenceCard term={term} sentence={sentence} key={sentence._id.toString()}/>
        })

        return (
            <div>
                <TermInfo term={term}/>
                <div id="sentenceCards">
                    <SentenceCards />
                </div>
            </div>
        )
    }
}

export default withParams(Term)