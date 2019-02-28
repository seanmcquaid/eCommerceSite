import React,{Component} from "react";
import GameCard from "../utility/GameCard";
import axios from "axios";

// axios is what allows you to query via the route in express then into postgres! the res.json is the data RETURNED VIA THE PROMISE! 
class Content extends Component{
    constructor(){
        super();
        this.state = {
            games : []
        }
    }

    componentDidMount(){
        const gamesPromise = axios.get(`${window.apiHost}/games/getHome`);
        // console.log(gamesPromise)
        gamesPromise.then((response)=>{
            const games = response.data;
            this.setState({
                games : games
            })
        })
    }

    render(){
        const gameCards = this.state.games.map((game, index)=>{
            return(
                <GameCard key={index} data={game}/>
            )
        })

        return(
            <div className="row">
                <div className="col s12">
                    {gameCards}
                </div>
            </div>
        )
    }
}

export default Content;