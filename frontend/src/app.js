// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Gallery from './components/Dashboard/Gallery';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/gallery" component={Gallery} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;