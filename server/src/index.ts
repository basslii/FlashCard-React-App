import { json } from "body-parser";
import express, { Request, Response} from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck';

const app = express();
const PORT = 5000;

app.use(express.json());

// app.get('/decks', (req: Request, res: Response) => {
//     res.send("Hello Hello Wolrd");
// })

app.post('/decks', async (req:Request, res:Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });

    const createdDeck = await newDeck.save();
    res.json(createdDeck)
})

mongoose
    .connect(
        'mongodb+srv://flashCardApp:SWxnlwHKqx9cPS32@cluster0.awhndku.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log(`DB is listening on Port: ${PORT}`);
        app.listen(PORT);
    })
