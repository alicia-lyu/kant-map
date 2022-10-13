import findCategory from "../../utils/findCategory"
import colorBadge from "./colorBadge"

export default function TermInfo(props) {
    const term = props.term
    const { name, english, webLink, category: categoryIndex } = term
    const categoryName = findCategory(categoryIndex)
    const badgeClass = colorBadge(categoryIndex)
    return (
        <div id="termInfo">
            <h1>{name},
                <span className="fs-2">{english}</span>
                <span className={`badge ${badgeClass}`}>{categoryName}</span>
            </h1>
            <a href={webLink}>Definition and Explanation on textlog.de</a>
        </div>
    )

}