import React, {Component} from "react";
import {Link} from "react-router-dom";

class GameCard extends Component {
    render(){
        // console.log(this.props)
        const images = this.props.data.screenshot_url.split(",");
        const rand = Math.floor(Math.random() * images.length);
        const image = images[rand];
        return(
            <div className="col s3 game-card">
                <Link to={`/game/${this.props.data.id}`}>
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={image} alt="stuff"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{this.props.data.name}<i className="material-icons right">more_vert</i></span>
                    </div>
                </div> 
                </Link> 
            </div>      
        )
    }
}

export default GameCard;