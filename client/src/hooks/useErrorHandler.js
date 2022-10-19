import { setMessage } from "../slices/message.slice";
import { useDispatch } from "react-redux";

function disregardError(error) {
    console.log(error)
}

export default function useErrorHandler(error) {
    const dispatch = useDispatch();
    let message
    try {
        message =
        ((error.response || null) &&
            (error.response.data || null) &&
            (error.response.data.message || null)) || 
            error.message ||
            error.toString();
    } catch (error) {
        disregardError(error)
    }
    if (!message) {
        message = 'Error Unknown'
    }
        
    return () => {
        dispatch(setMessage(message))
    }
}