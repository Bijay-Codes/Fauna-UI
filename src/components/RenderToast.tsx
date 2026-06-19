import { useState } from "react"

export function useToast() {
    const [message, setMessage] = useState('');
    const showMessage = (notif: string) => {
        setMessage(notif);
        setTimeout(() => {
            setMessage('')
        }, 4000)
    }
    return { message, showMessage };
}