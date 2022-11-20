import './decks.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import deleteDeck from '../../api/deleteDeck';
import createDeck from '../../api/createDeck';
import fetchDecks, { IDeck } from '../../api/fetchDecks';

export default function Decks () {
    const [title, setTitle] = useState('');
    const [getDecks, setGetDecks] = useState<IDeck[]>([])

    useEffect(() => {
        // fetch the dfata from the /decks
        async function getDecksFromServer() {
            const receivedDecks = await fetchDecks();
            setGetDecks(receivedDecks)
            console.log(receivedDecks)
        }

        getDecksFromServer();

    }, [getDecks])
 
    const onCreateDecks = async (event: React.FormEvent) => {
        event.preventDefault();

        if(title.length > 0) {
            const result = await createDeck(title)
            setGetDecks([...getDecks, result]);
        }

        setTitle('');
    }

    const onDeleteDeck = async (deckId: string) => {
        await deleteDeck(deckId);
        setGetDecks(getDecks.filter(deck => deck._id !== deckId))
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
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setTitle(event.target.value)}}
                        />
                        <button className='btn btn-primary' type='submit' disabled={title.length === 0}>add title</button>
                    </form>
                </div>
                <div className="flashCard-container">
                    <label>Your FlashCard</label>
                </div>
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
                                                <p>test test</p>
                                                <p>test test</p>
                                                <p>test test</p>
                                                <Link to={`/decks/${deck._id}`} className="pos-bot">Edit Deck</Link>
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
            {/* <Notification /> */}
        </>
    )   
}