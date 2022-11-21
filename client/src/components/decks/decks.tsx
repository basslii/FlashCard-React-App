import './decks.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/navbar';
import { Link, useNavigate } from 'react-router-dom';
import deleteDeck from '../../api/deleteDeck';
import createDeck from '../../api/createDeck';
import fetchDecks, { IDeck } from '../../api/fetchDecks';
import Notification from '../notification/notification';
import { INotification } from '../../models/notificationModel';

export default function Decks () {
    const [title, setTitle] = useState('');
    const [getDecks, setGetDecks] = useState<IDeck[]>([])
    const [notificationList, setNotificationList] = useState<INotification[]>([])
    const navigate = useNavigate();
    let notificationProps:INotification | null = null;
    let isShown: boolean | undefined = false

    useEffect(() => {
        // fetch the dfata from the /decks
        async function getDecksFromServer() {
            const receivedDecks = await fetchDecks();
            setGetDecks(receivedDecks)
        }

        getDecksFromServer();

    }, [])

    const onCreateDecks = async (event: React.FormEvent) => {
        event.preventDefault();

        if(title.length) {
            const result = await createDeck(title)
            setGetDecks([...getDecks, result]);

            //display notification
            callNotificationSuccess(result._id)
        }

        setTitle('');
    }

    const onDeleteDeck = async (deckId: string) => {
        await deleteDeck(deckId);
        setGetDecks(getDecks.filter(deck => deck._id !== deckId));
        callNotificationDelete(deckId);
    }

    const backToHomePage = () => {
        navigate('/homepage');
    }

    const callNotificationSuccess = (deckId: string) => {
        isShown = true;
        notificationProps = {
                id: 1,
                title: 'Success',
                description: `Successfully created deck with id: ${deckId}`,
                backgroundColor: '#5cb85c',
            },
        
        setNotificationList([...notificationList, notificationProps])
    }
    
    const callNotificationDelete = (deckId: string) => {
        isShown = true;
        notificationProps = {
                id: 2,
                title: 'Delete',
                description: `Deleted deck with id: ${deckId}`,
                backgroundColor: '#ff6c70',
            },
        
        setNotificationList([...notificationList, notificationProps])
    }
    
    return (
        <>
            <Navbar />
            <div className="deckComp-container">
                <div className="decks-input">
                    <form onSubmit={onCreateDecks}>
                        <label htmlFor="getDeckTitle">Deck Title</label>
                        <input 
                            id="getDeckTitle" 
                            type="text" 
                            className='form-control' 
                            placeholder='insert new desk title' 
                            value={title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                        />
                        <button className='btn' type='submit' disabled={!title.length}>add title</button>
                    </form>
                </div>
                {/* <div className="flashCard-container">
                    <label>Your FlashCard</label>
                </div> */}
                <ul className="view-decks">
                    {
                        getDecks.map((deck: any) => {
                            return (
                                <>
                                    <div className="deckCard">
                                        <div className="deckCard-inner">
                                            <div className="deck-behind">
                                                <div className="delete-button-place">
                                                    <button className="btn-delete" onClick={() => onDeleteDeck(deck._id)}>X</button>
                                                </div>
                                                <div className="description-container-deck">
                                                    {
                                                        deck?.descriptions?.map((description: string) => {
                                                            return (
                                                                <div className="list-container-deck">
                                                                    <li className="desciption-context">{description}</li>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <Link to={`/decks/${deck._id}`} className="pos-bot">View Deck</Link>
                                            </div>   
                                            <div className="deck-front">
                                                <div className="delete-button-place">
                                                    <button className="btn-delete" onClick={() => onDeleteDeck(deck._id)}>X</button>
                                                </div>
                                                <li key={deck._id}><label>{deck.title}</label></li>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </>
                            )
                        })
                    }
                </ul>
            </div>
            <Notification notificationList={notificationList} setNotificationList={setNotificationList} hidden={!isShown}/>
            <div className="button-bottom">
                    <button onClick={() => backToHomePage()}>back to homepage</button>
            </div>
        </>
    )   
}