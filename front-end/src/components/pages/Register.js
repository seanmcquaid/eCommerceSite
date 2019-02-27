import React, { Component } from 'react';
class Register extends Component{
    constructor(){
        super();
    }

    registerSubmit = (event)=>{
        event.preventDefault();
        console.dir(event.target)
    }

    render(){
        return(
        <main>
            <center>
            <div className="container">
                <div className="z-depth-1 grey lighten-4 row login">
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
export default Register;