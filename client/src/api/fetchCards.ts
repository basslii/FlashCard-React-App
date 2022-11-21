import { API_URL } from "./config";
import { IDeck } from "./fetchDecks";

export default async function fetchCards(deckId: string): Promise<IDeck> {
    const result = await fetch(`${API_URL}/decks/${deckId}`).then(async (res:Response) => await res.json());
    return result;
}