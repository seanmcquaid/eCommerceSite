import React, {Component} from 'react';
import loginTab from "../../misc/openWindow";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class LoginNavBar extends Component{
    // 1. User clicks and opens the new window via loginTab
    // 2. New window is open to crossOrigin but is github.com
    // 3. Once user authenticates, github sends them to /auth/github/callback
    // 4. The callback URL either gets the uid or inserts them
    // 5. Callback then takes the uid and tokenizes it with JWT
    // 6. Token is sent back to the github window that loginTab opened and
    // window.opener.postMessage is in the script of that window which
    // sends the data back over to original page
    // 7. It's now available in this promise resolution
    // 8. Put it in localstorage so we can use it next time.

    constructor(){
        super();
    }

    githubAuth = (event)=>{
        loginTab("http://localhost:3000/auth/github")
    }

    render(){
        let rightNavBar = "";
        if(this.props.auth.username !== undefined){
            // user is logged in!
            rightNavBar = <span>Welcome, {this.props.auth.username}</span>
        } else {
            // user is not logged in
            rightNavBar = <span>
                <Link to="/login">Sign In </Link> or <Link to="/register"> Register</Link>
                <button type="button" onClick={this.githubAuth} className="login-button btn btn-github">
                    <img src="/images/GitHub-Mark-Light-32px.png"/>
                    Login with github
                </button>
                </span>;
        }
        // console.log(this.props.auth)
        return(
            <nav className="login-nav-bar grey darken-4">
                <div className="nav-wrapper">
                    <div className="left ">WELCOME TO ZAPP</div>
                    <div className="right">
                    {rightNavBar}
                    MY CART 0 ITEM - £0.00
                    </div> 
                </div>
            </nav>      
            )
    }
}

function mapStateToProps(state){
    return {
        auth : state.auth
    }
}
export default connect(mapStateToProps)(LoginNavBar);
// export default LoginNavBar;