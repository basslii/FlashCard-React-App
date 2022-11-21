import { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import './homepage.css';
import '../decks/decks.css'
import fetchDecks, { IDeck } from "../../api/fetchDecks";
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {

    const [decks, setDecks] = useState<IDeck[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getDataFromServer() {
            const result = await fetchDecks();
            setDecks(result);
        }

        getDataFromServer();
    }, []);

    const toDeckComponent = () => {
        navigate('/decks')
    }
    
    return (
        <>
            <Navbar />
            <div className="homepage">
                <div className="btn-placement">
                    <button className='btn' onClick={() => toDeckComponent()}>Edit Decks</button>
                </div>
                <div className="flashCard-container">
                    <label className='white font-40'>Your FlashCard</label>
                    <h4 className='black font-20'>You have <span className='white bold'>{decks.length}</span> flash cards</h4>
                </div>
                <ul className="view-decks">
                    {
                        decks.map((deck: any) => {
                            return (
                                <>
                                    <div className="deckCard">
                                        <div className="deckCard-inner">   
                                        <div className="deck-behind">
                                                <div className="description-container-homepage">
                                                    {
                                                        deck?.descriptions?.map((description: string) => {
                                                            return (
                                                                <div className="list-container-homepage">
                                                                    <li className="desciption-context">{description}</li>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <Link to={`/decks/${deck._id}`} className="pos-bot">View Deck</Link>
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