import Card from 'react-bootstrap/Card'
import { BrowserRouter as Link } from 'react-router-dom'
import nameToUrl from '../../utils/nameToUrl';

export default function SentenceCard(props) {
    const term = props.term;
    const sentence = props.sentence;
    const termNameField = nameToUrl(term.name);
    const sentenceIdField = sentence._id.toString();
    return (
        <Card>
            <div class="card-body">
                <p class="card-text">{props.sentence.text}</p>
                <Link to={`/${termNameField}/${sentenceIdField}`} class="btn btn-dark">View</Link>
            </div>
        </Card>
    )
}