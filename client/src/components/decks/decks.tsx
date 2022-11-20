import './decks.css'
import React, { Component, useEffect, useState } from 'react'
import Navbar from '../navbar/navbar';
import Notification from '../notification/notification';

type IDeck = {
    title: string;
    _id: string;
}

export default function Decks () {
    const [title, setTitle] = useState('');
    const [getDecks, setGetDecks] = useState<IDeck[]>([])

    useEffect(() => {
        // fetch the dfata from the /decks
        async function fetchDecksFromServer() {
            const result = await fetch('http://localhost:5000/decks').then(res => res.json());

            setGetDecks(result);
        };
        fetchDecksFromServer();

    }, [getDecks])
 
    const onCreateDecks = async (event: React.FormEvent) => {
        event.preventDefault();

        if(title.length > 0) {
            const result = await fetch('http://localhost:5000/decks', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: Response) => res.json());

            setGetDecks([...getDecks, result]);
        }

        setTitle('');
    }

    const onDeleteDeck = async (deckId: string) => {
        await fetch(`http://localhost:5000/decks/${deckId}`, {
                method: 'DELETE',
        });

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
                                                <a href="/card" className="pos-bot">Edit Deck</a>
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