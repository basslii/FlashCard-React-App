import { Component, ReactNode } from "react";
import Navbar from "../navbar/navbar";
import "./cards.css"

export default class Cards extends Component {
    render(): ReactNode {
        return (
            <>
                <Navbar />
                <div className="cards-component">
                    <h1>Welcome To Create Card Solution</h1>
                </div>
            </>
        )
    }
}