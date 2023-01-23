import { useParams } from "react-router-dom";

export default function withParams(Component) {
    function ComponentWithParams() {
        const params = useParams();
        return <Component params={params}/>
    }
    return ComponentWithParams;
}