import React,{Component} from "react";
import GameCard from "../utility/GameCard";

class Content extends Component{
    render(){
        return(
            <div className="row">
                <div className="col s12">
                    <GameCard/>
                    <GameCard/>
                    <GameCard/>
                </div>
            </div>
        )
    }
}

export default Content;