import React, { Component } from "react";
import "./welcomepage.css"

export default class WelcomePage extends Component {
    render(): React.ReactNode {
        return (
            <React.StrictMode>
                <div className="welcomepage">
                    <h1>Welcome To Flash Card Single page Application</h1>
                    <a href="/decks">Click Here To Proceed</a>
                </div>  
            </React.StrictMode>
        )
    }
}