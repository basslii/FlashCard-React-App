import Navbar from "../navbar/navbar";
import "./cards.css"
import fetchDecks, { IDeck } from '../../api/fetchDecks';

export default function Cards() {


    return (
        <>
            <Navbar />
            <div className="center">
                <div className="card-component">
                    <h1>{}</h1>
                </div>
            </div>
        </>
    )
    
}