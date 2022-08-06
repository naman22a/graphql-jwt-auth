import React from 'react';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from 'react-router-dom';
import { Header } from './components';
import { Dashboard, Home, Login, Register } from './pages';

const Routes: React.FC = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Switch>
        </Router>
    );
};

export default Routes;
