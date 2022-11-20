import Navbar from "../navbar/navbar";
import "./cards.css"
import React, { useEffect, useState } from 'react'
import {  Navigate, useNavigate, useParams } from 'react-router-dom';
import createCard from "../../api/createCard";
import fetchCards from "../../api/fetchCards";
import { IDeck } from "../../api/fetchDecks";
import deleteCard from "../../api/deleteCard";

export default function Cards() {
    const [descriptionInput, setDescriptionInput] = useState('');
    const [descriptionContent, setdescriptionContent] = useState<string[]>([])
    const [deck, setDeck] = useState<IDeck | undefined>()
    const { deckId } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => { 
        async function getDescriptionFromServer() {
            const result = await fetchCards(deckId!);
            setDeck(result)
            // setdescriptionContent(result.descriptions)
        }

        getDescriptionFromServer();
    }, [deck])

    const onCreateDescriptions = async (event:React.FormEvent) => {
        event.preventDefault();
        
        if(descriptionInput.length) {
            const { descriptions: serverDescriptions } = await createCard(descriptionInput, deckId!);
            setdescriptionContent(serverDescriptions);
        }

        setDescriptionInput('');
    }

    const onDeleteDescription = async (descriptionId: number) => {
        await deleteCard(deckId!, descriptionId)
        setdescriptionContent(descriptionContent.filter((description, index) => index !== descriptionId));
    }

    const backToHomePage = () => {
        navigate('/homepage');
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
                            deck?.descriptions.map((description: string, index: number) => {
                                return (
                                    <>
                                    <div className="content-container">
                                        <li key={index} className="black font-30 padding-20">
                                            {description}
                                        </li>
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
                <div className="button-bottom">
                    <button onClick={() => backToHomePage()}>back to homepage</button>
                </div>
            </div>
        </>
    )
    
}