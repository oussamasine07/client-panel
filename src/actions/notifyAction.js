import { NOTIFY_USER } from "./types";


export const notifyAction =  (message, messageType) => {
    return {
        type: NOTIFY_USER,
        message,
        messageType
    }
}