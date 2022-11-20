import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  title: String,
  descriptions: [String],
});

const deckModel = mongoose.model('Deck', DeckSchema)

export default deckModel;