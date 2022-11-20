import { config } from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { getCardController } from './controllers/getCardController';
import { createCardController } from './controllers/createCardController';
import { deleteCardController } from './controllers/deleteCardController';

const app = express();
const PORT = 5000;

config();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getCardController);
app.post('/decks/:deckId/descriptions', createCardController);
app.delete('/decks/:deckId/descriptions/:descriptionId', deleteCardController);

mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
        console.log(`DB is listening on Port: ${PORT}`);
        app.listen(PORT);
    })
