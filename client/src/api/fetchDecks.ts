import { API_URL } from "./config";

export type IDeck = {
    title: string;
    _id: string;
}

export default async function fetchDecks(): Promise<IDeck[]> {
    const result = await fetch(`${API_URL}/decks`).then((res:Response) => res.json());

    return result;
}