import Navbar from "../navbar/navbar";
import "./cards.css"
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import createCard from "../../api/createCard";
import fetchCards from "../../api/fetchCards";
import { IDeck } from "../../api/fetchDecks";
import deleteCard from "../../api/deleteCard";
import { INotification } from '../../models/notificationModel';
import Notification from "../notification/notification";

export default function Cards() {
    const [descriptionInput, setDescriptionInput] = useState('');
    const [descriptionContent, setdescriptionContent] = useState<string[]>([])
    const [deck, setDeck] = useState<IDeck | undefined>()
    const [notificationList, setNotificationList] = useState<INotification[]>([])
    const { deckId } = useParams(); 
    const navigate = useNavigate();
    let notificationProps:INotification | null = null;
    let isShown: boolean | undefined = false

    useEffect(() => { 
        async function getDescriptionFromServer() {
            const result = await fetchCards(deckId!);
            setDeck(result)
        }

        getDescriptionFromServer();
    }, [descriptionContent])

    const onCreateDescriptions = async (event:React.FormEvent) => {
        event.preventDefault();
        
        if(descriptionInput.length) {
            const { descriptions: serverDescriptions } = await createCard(descriptionInput, deckId!);
            setdescriptionContent(serverDescriptions);
            callNotificationSuccess(descriptionInput);
        }

        setDescriptionInput('');
    }

    const onDeleteDescription = async (descriptionId: number) => {
        await deleteCard(deckId!, descriptionId)
        setdescriptionContent(descriptionContent.filter((description, index) => index !== descriptionId));
        callNotificationDelete((descriptionId! + 1).toString());
    }

    const backToHomePage = () => {
        navigate('/homepage');
    }

    const callNotificationSuccess = (description: string) => {
        isShown = true;
        notificationProps = {
                id: 1,
                title: 'Success',
                description: `Successfully created description with id: ${description}`,
                backgroundColor: '#5cb85c',
            },
        
        setNotificationList([...notificationList, notificationProps])
    }
    
    const callNotificationDelete = (descriptionId: string) => {
        isShown = true;
        notificationProps = {
                id: 2,
                title: 'Delete',
                description: `Deleted description with id: ${descriptionId}`,
                backgroundColor: '#ff6c70',
            },
        
        setNotificationList([...notificationList, notificationProps])
    }

    return (
        <>
            <Navbar />
            <div className="card-input">
                <form onSubmit={onCreateDescriptions}>
                    <label htmlFor="getDescriptionText">Description</label>
                    <input 
                        id="getDescriptionText" 
                        type="text" 
                        className='form-control ' 
                        placeholder='insert new description' 
                        value={descriptionInput}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescriptionInput(event.target.value)}
                    />
                    <button className='btn' type='submit' disabled={!descriptionInput.length}>add description</button>
                </form>
            </div>
            <div className="center">
                <div className="card-component">
                    <div className="deck-title black">
                        <h1>{deck?.title}</h1>
                    </div>
                    <ul className="padding-left-0">
                        {
                            deck?.descriptions.map((description: any, index: number) => {
                                return (
                                    <>
                                    <div className="content-container">
                                        <div className="list-container">
                                            <li key={index} className="black font-30 padding-20">
                                                {description}
                                            </li>
                                        </div>
                                        <div className="end">
                                            <button onClick={() => onDeleteDescription(index)}>delete</button>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </ul>
                    
                </div>
            </div>
            <Notification notificationList={notificationList} setNotificationList={setNotificationList} hidden={!isShown}/>
            <div className="button-bottom">
                    <button onClick={() => backToHomePage()}>back to homepage</button>
            </div>
        </>
    )
    
}