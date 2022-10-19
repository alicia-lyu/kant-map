import useErrorHandler from "./useErrorHandler";
export default function withErrorHandler(Component) {
    function ComponentWithErrorHandler() {
        const errorHandler = useErrorHandler();
        return <Component errorHandler={errorHandler}/>
    }
    return ComponentWithErrorHandler
}