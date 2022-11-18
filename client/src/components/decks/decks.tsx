import './decks.css'
import React, { Component, useEffect, useState } from 'react'
import Navbar from '../navbar/navbar'
type Ideck = {
    title: string
}

export default function Decks () {
    const [title, setTitle] = useState('');
    // const [getDecks, setGetDecks] = useState<Ideck>([])
    const [getDecks, setGetDecks] = useState([])

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
            await fetch('http://localhost:5000/decks', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        setTitle('');
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
                                                <p>test test</p>
                                                <p>test test</p>
                                                <p>test test</p>
                                            </div>   
                                            <div className="deck-front">
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
        </>
    )   
}