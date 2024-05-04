import React from 'react';
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gapi } from "gapi-script";

const App = () => {

    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "566883177832-3jbs9oo53fu8j4jfidf0ca9qe2mi55mt.apps.googleusercontent.com",
          // plugin_name: "chat",
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
        });
      });
   
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/auth' Component={Auth}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;