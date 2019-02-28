import React, {Component} from "react";

class GameCard extends Component {
    render(){
        console.log(this.props)
        const images = this.props.data.screenshot_url.split(",");
        const rand = Math.floor(Math.random() * images.length);
        const image = images[rand];
        return(
            <div className="col s3 game-card">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={image} alt="stuff"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{this.props.data.name}<i className="material-icons right">more_vert</i></span>
                        <p></p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{this.props.data.name}<i className="material-icons right">close</i></span>
                        <p>{this.props.data.summary}</p>
                    </div>
                </div>  
            </div>      
        )
    }
}

export default GameCard;