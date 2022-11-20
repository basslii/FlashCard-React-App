import { API_URL } from "./config";

type IDeck = {
    title: string;
    _id: string;
}

export default async function deleteDeck(deckId:string) {
    await fetch(`${API_URL}/decks/${deckId}`, {
            method: 'DELETE',
    });
}