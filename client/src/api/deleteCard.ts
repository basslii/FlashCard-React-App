import { API_URL } from "./config";

export default async function deleteCard(deckId:string, descriptionId: number) {
    await fetch(`${API_URL}/decks/${deckId}/descriptions/${descriptionId}`, {
            method: 'DELETE',
    });
}