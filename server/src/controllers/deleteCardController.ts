import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardController(req:Request, res:Response) {
    const deckId = req.params.deckId;
    const descriptionId = req.params.descriptionId;
    const deck = await Deck.findById(deckId);

    if(!deck) return res.status(400).send("No discription of this id exists in this deck database");
    else {
        deck.descriptions.splice(parseInt(descriptionId), 1)
        await deck.save();
        res.json(deck);
    }
}