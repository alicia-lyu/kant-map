import findCategory from "../../utils/findCategory"
import colorBadge from "../Term/colorBadge"
import { Link } from "react-router-dom"

export default function TermInfo(props) {
    const term = props.term
    if (!term) {
        return (<div id="termInfo"><h1>undefined</h1></div>)
    }
    const { name, english, weblink, category: categoryIndex } = term
    const categoryName = findCategory(categoryIndex)
    const badgeClass = colorBadge(categoryIndex)
    return (
        <div id="termInfo">
            <h1>{name},&nbsp;
                <span className="fs-2">{english}</span>
                <span className={`badge ${badgeClass}`}>{categoryName}</span>
            </h1>
            <a href={weblink}>Definition and Explanation on textlog.de</a>
            <Link to={`${name}/add-sentence`} className="btn btn-dark" >Add a new sentence</Link>
        </div>
    )
}