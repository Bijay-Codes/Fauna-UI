import { useState } from "react"
export function RenderCopybtn({ theme = '' }) {

    const [text, setText] = useState('Copy');
    const handleCopy = () => {
        navigator.clipboard.writeText("Hello World")
            .then(() => {
                setText('Copied');
                setTimeout(() => {
                    setText('Copy');
                }, 3000);
            })
            .catch(err => {
                console.error(err);
                setText('Try again');
                setTimeout(() => {
                    setText('Copy');
                }, 2000);
            });
    }
    return (
        <div>
            {theme ? (<button style={{ background: theme }} onClick={handleCopy}>{text}</button>)
                : (<button onClick={handleCopy}>{text}</button>)}
        </div>

    )
}