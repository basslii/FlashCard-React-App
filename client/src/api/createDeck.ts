import { API_URL } from "./config";
import { IDeck } from "./fetchDecks";

export default async function createDeck(title: string): Promise<IDeck> {
    const result = await fetch(`${API_URL}/decks`, {
            method: 'POST',
            body: JSON.stringify({
                title,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: Response) => res.json());

    return result;
}