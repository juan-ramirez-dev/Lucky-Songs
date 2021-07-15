import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from '../Views/All/Login';
import Register from '../Views/All/Register';
import Welcome from '../Views/All/Welcome';
import Music from '../Views/User/Music';
import Playlist from '../Views/User/Playlist';
import Dashboard from '../Views/User/Dashboard';

const Rutas = ({User}) => {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/Login">
                        { !User ?  <Login />  : <Music /> }
                    </Route>
                    <Route path="/Register">
                        { !User ?  <Register />  : <Music /> }
                    </Route>
                    <Route path="/Music">
                        { !User ? <Login /> :  <Music /> }
                    </Route>
                    <Route path="/PlayList">
                        { !User ? <Login /> :  <Playlist /> }
                    </Route>

                    <Route path="/Dashboard">
                        { !User ? <Login /> :  <Dashboard /> }
                    </Route>

                    <Route path="/">
                        <Welcome />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
 
export default Rutas;