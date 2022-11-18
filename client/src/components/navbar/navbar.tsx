import { Component } from 'react';
import './navbar.css';

export default class Navbar extends Component {
    render(): React.ReactNode {
        return (
            <div className="navbar">
                {/* <h3>This is for navbar</h3> */}
                <a href="/homepage" className='logo'>Logo</a>
            </div>
        )
    }
} 