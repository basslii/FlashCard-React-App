import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardController(req:Request, res:Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    const { text } = req.body;

    if(!deck) return res.status(400).send("No deck of this id exists in database");
    else {
        deck.descriptions.push(text);
        await deck.save();
        res.json(deck);
    }
}