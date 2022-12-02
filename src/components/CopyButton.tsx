import { useState } from 'react';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';

interface Props {
    content: string
}

export function CopyButton({content}: Props) {
    const [animation, setAnimation] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(content);
        setAnimation(true);
        setTimeout(() => {
            setAnimation(false);
        }, 1000);
    }

    return  (
        <div onClick={onCopy} className={`cursor-pointer ${animation && 'animate-ping'}`}>
            <CopyIcon/>
        </div>
    )
}