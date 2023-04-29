import { Component } from "react";
import { MenuData } from "./MenuData";
import "./NavbarStyle.css";

class Navbar extends Component {

    // Pershkruan gjendjen fillestare te komponentit
    state = { clicked: false };

    // Metode qe ndryshon gjendjen "clicked" kur butoni "menu-icons" klikohet
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    // Klase pergjegjese per ruajtjen e gjendjes se "clicked" per menune e Navbar-it dhe per shfaqjen e elementeve te navbar ne faqe.
    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="logo">Ruby</h1>
                <div className="menu-icons" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.url} className={item.cName}>
                                    <i className={item.icon}></i>{item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navbar;