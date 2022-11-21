import './notification.css';
import { useCallback, useEffect } from 'react';

export default function Notification(props: any) {
    const {notificationList, setNotificationList} = props;
    let notiId: number | null = null

    useEffect(() => {
        const interval = setInterval(() => {
            if(notificationList.length) {
                notificationList.map(async (item:object , index:number) => {
                    await onCloseNotification(index)
                }).reverse()
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [notificationList, setNotificationList])

    const onCloseNotification = useCallback(async (id: number) => {
        notiId = id;
        const removeNotification = notificationList.filter((item:object, index:number) => index !== notiId)
        setNotificationList(removeNotification)
    }, [notificationList])

    return (
        <div className="container bottom-right">
            {
                notificationList.map((item: any, index: number) => {
                    return (
                        <div className="padding-10">
                            <div key={index} style={{background: item?.backgroundColor, border: `1px solid ${item?.backgroundColor}`}} className='notification-container bottom-right'>
                                <div className="delete-button-place-notification">
                                    <button className="btn-delete-notification" onClick={() => onCloseNotification(index)}>x</button>
                                </div>
                                <h3 className='margin-10 font-24'>{item?.title}</h3>
                                <p className='margin-0'>{item.description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

