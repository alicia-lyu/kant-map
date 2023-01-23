import React from "react";
import withParams from "../../hooks/withParams";
import sentenceService from "../../services/sentence.service";
import SentenceCard from "./SentenceCard";
import TermInfo from "../common/TermInfo";
import { sample } from "./sample";

class Term extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: undefined,
            sentences: []
        }
    }

    componentDidMount() { // connect react-router and axios
        const getData = async () => {
            let termDocument, sentences
            try {
                const res = await sentenceService.getAll(this.props.params.termName);
                const data = res.data
                termDocument = data.termDocument
                sentences = data.sentences
            } catch (error) {
                console.log(error)
                termDocument = sample.sampleTermDoc;
                sentences = sample.sampleSentences;
                return {termDocument, sentences}
            }
            return {termDocument, sentences}
        }
        const receiveData = async () => {
            const {termDocument, sentences} = await getData()
            console.log(termDocument, sentences)
            this.setState({
                term: termDocument,
                sentences
            })
        }
        receiveData();
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
                    {SentenceCards}
                </div>
            </div>
        )

        // First render (but the render result is invisible), then call componentDidMount. Make sure the initial state before ComponentDidMount isn't causing any mistake.
    }
}

export default withParams(Term)