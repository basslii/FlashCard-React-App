import { API_URL } from "./config";

export type IDeck = {
    title: string;
    _id: string;
    descriptions: string[];
}

export default async function fetchDecks(): Promise<IDeck[]> {
    const result = await fetch(`${API_URL}/decks`).then(async (res:Response) => await res.json());

    return result;
}