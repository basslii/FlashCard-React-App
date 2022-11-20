import { SyntheticEvent, useEffect, useRef } from 'react';
import './notification.css'

const TOAST_TIME_MS = 4500 as const;

interface ToastProperties {
    timer?: number;

    // label: string;
}

const Notification: React.FC<ToastProperties> = (props) => {

    const notification = useRef<HTMLOutputElement>(null);
    let timer: number = -1;

    const onReset = () => {
        window.clearTimeout(timer);
    }

    const onStart = () => {
        timer = window.setTimeout(HideNotification, props.timer);
    }

    const onClose = (event: SyntheticEvent | null) => {
        if (event) event.preventDefault();

        HideNotification();
    }

    useEffect(() => {
        onStart();
        Notification.current?.focus();

        return () => {
            onClose(null);
        };
    });

    return (
        <output>
            <div className="notification-container bottom-right bg-red">
                <div className="notfication toast">
                    <div className="delete-button-place">
                        <button type="button" onClick={onClose} aria-label="Close dialog" className="btn-delete">X</button>
                    </div>
                    <p>Successfully deleted entry with id: </p>
                </div>
            </div>
        </output>
    )
}

Notification.defaultProps = {
    timer: TOAST_TIME_MS
};

export default Notification;
