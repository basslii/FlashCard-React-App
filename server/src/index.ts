import { config } from 'dotenv';
import express, { Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';

const app = express();
const PORT = 5000;

config();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/decks', async (req: Request, res: Response) => {
    const decks = await Deck.find();
    res.json(decks)
})

app.post('/decks', async (req:Request, res:Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });

    const createdDeck = await newDeck.save();
    res.json(createdDeck)
})

app.delete('/decks/:deckId', async (req:Request, res: Response) => {
    const deckId = req.params.deckId;

    const deletedDeck = await Deck.findByIdAndDelete(deckId)

    res.json(deletedDeck);
})

mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
        console.log(`DB is listening on Port: ${PORT}`);
        app.listen(PORT);
    })
