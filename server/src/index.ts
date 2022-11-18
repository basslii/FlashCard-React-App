import { config } from 'dotenv';
import express, { Request, Response} from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck';

const app = express();
const PORT = 5000;

config();

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
    .connect(process.env.MONGO_URL!)
    .then(() => {
        console.log(`DB is listening on Port: ${PORT}`);
        app.listen(PORT);
    })
