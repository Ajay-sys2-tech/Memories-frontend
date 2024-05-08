import React from 'react';
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { gapi } from "gapi-script";

const App = () => {

    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "566883177832-3jbs9oo53fu8j4jfidf0ca9qe2mi55mt.apps.googleusercontent.com",
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
        });
      });

      const user = JSON.parse(localStorage.getItem('profile'));
   
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path='/' Component={() =>  <Navigate to="/posts" />} />
                    <Route path='/posts' exact Component={Home} />
                    <Route path='/posts/search' exact Component={Home} />
                    <Route path='/posts/:id' exact Component={PostDetails} />
                    <Route path='/auth' Component={() => (!user ? <Auth /> : <Navigate  to={`/posts`}/>)} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;