import { setMessage } from "../slices/message.slice";
import { useDispatch } from "react-redux";

export default function handleError(error) {
    const dispatch = useDispatch();
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();
    dispatch(setMessage(message))
}