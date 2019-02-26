import React from 'react';
import LoginNavBar from './LoginNavBar';
import LogoSearchHeader from './LogoSearchHeader';
import MainNav from './MainNav';
import './Nav.css'

function Headers(props){
return (
    <div className="header">
        <div className="container-fluid">
            <div className="row">
                <LoginNavBar />
            </div>
        </div>
        <div className="container">
            <div className="row">
                <LogoSearchHeader />
            </div>        
            <div className="row">
                <MainNav />
            </div>
        </div>
    </div>
    )
}
export default Headers;