import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Decks from './components/decks/decks';
import HomePage from './components/homepage/homepage';
import WelcomePage from "./components/welcomepage/welcomepage"
import Cards from "./components/cards/cards"

export class App extends Component {
  render(): React.ReactNode {
    return (
      <React.StrictMode>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<WelcomePage/>}/>
              <Route path="/homepage" element={<HomePage/>}/>
              <Route path="/decks" element={<Decks/>}/>
              <Route path="/card" element={<Cards/>}/>
            </Routes>
          </div>
        </Router>
      </React.StrictMode>
    )
      
  }
}

