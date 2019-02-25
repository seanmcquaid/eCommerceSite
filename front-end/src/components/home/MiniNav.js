import React,{Component} from "react";

class MiniNav extends Component{
    render(){
        const categories = [
            "NES", 
            "DreamCast",
            "N64",
            "PlayStation",
            "Atari",
            "Odessey"
        ]
        return(
            <nav>
                <div className="nav-wrapper">
                <ul className="left hide-on-med-and-down">
                    <li><a href="sass.html">Boom</a></li>
                    <li><a href="badges.html">Roasted</a></li>
                    <li className="active"><a href="collapsible.html">Inc.</a></li>
                </ul>
                </div>
            </nav>
        )
    }
}

export default MiniNav;