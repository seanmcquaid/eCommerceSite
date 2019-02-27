import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import authAction from "../../actions/authAction";
import {connect} from "react-redux";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css"


class Register extends Component{
    constructor(){
        super();
        this.state = {
            msg : "",
            showAlert: false
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.auth.msg === "userExists"){
            // let the fool know they already registered!
            this.setState({
                showAlert : true
            })
        } else if(newProps.auth.msg === "userAdded"){
            this.props.history.push("/");
        }
    }

    registerSubmit = (event)=>{
        event.preventDefault();
        // console.dir(event.target)
        const username = event.target[0].value;
        const password = event.target[1].value;
        this.props.authAction({
            username,
            password
        })
    }

    render(){
        const msg = this.state.msg;
        return(
        <main>
            <SweetAlert
               show={this.state.showAlert}
               title="Registration Error"
               text="Email is already registered. Login or chooose a different email."
               onConfirm={() => this.setState({ showAlert: false })}
           />
            <center>
            <div className="container">
                <div className="z-depth-1 grey lighten-4 row login">
                <h3>{msg}</h3>
                <form className="col s12" onSubmit={this.registerSubmit}>
                    <div className='row'>
                    <div className='col s12'>
                    </div>
                    </div>
                    <div className='row'>
                    <div className='input-field col s12'>
                        <input className='validate' type='email' name='email' id='email' />
                        <label htmlFor='email'>Enter your email</label>
                    </div>
                    </div>
                    <div className='row'>
                    <div className='input-field col s12'>
                        <input className='validate' type='password' name='password' id='password' />
                        <label htmlFor='password'>Enter your password</label>
                    </div>
                    <label>
                        <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                    </label>
                    </div>
                    <br />
                    <center>
                    <div className='row'>
                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Register</button>
                    </div>
                    </center>
                </form>
                </div>
            </div>
            <a href="#!">Create account</a>
            </center>
            <div className="section"></div>
            <div className="section"></div> 
        </main>
        )
    }
}

function mapStateToProps(state){
    // state = rootReducer/store
    // key = this.props.key will be accessible to this component
    // value = property of rootreducer
    return{
        auth : state.auth
    }
}

function mapDispatchToProps(dispatcher){
    // dispatch is the thing that sends the action to all reducers
    // the action to all reducers
    return bindActionCreators({
        authAction: authAction
    },dispatcher)
}

// export default Register;

export default connect(mapStateToProps,mapDispatchToProps)(Register);