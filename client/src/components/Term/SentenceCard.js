import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import nameToUrl from '../../utils/nameToUrl';

export default function SentenceCard(props) {
    const term = props.term;
    const sentence = props.sentence;
    const termNameField = nameToUrl(term.name);
    const sentenceIdField = sentence._id.toString();
    return (
        <Card>
            <div className="card-body">
                <p className="card-text">{props.sentence.text}</p>
                <Link to={`/${termNameField}/${sentenceIdField}`} className="btn btn-dark">View</Link>
            </div>
        </Card>
    )
}