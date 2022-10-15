export default function DisplayMessage(props) {
    const message = props.message
    if (message) {
        return (
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        )
    } else {
        return
    }
}