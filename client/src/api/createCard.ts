import { API_URL } from "./config";
import { IDeck } from "./fetchDecks";

export default async function createCard(text: string, deckId: string): Promise<IDeck> {
    const result = await fetch(`${API_URL}/decks/${deckId}/descriptions`, {
            method: 'POST',
            body: JSON.stringify({
                text,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res: Response) => await res.json());

    return result;
}