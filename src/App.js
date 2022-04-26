import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import "./styles/index.scss";
import PrivateRoute from './components/HOC/PrivateRoute';
import Signin from './components/signin/index';
import Layout from './components/layout/index';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
    return (
        <>
            <BrowserRouter>
                    <Route exact path="/" component={Signin} />
                    <PrivateRoute path="/admin">
                        <Layout />
                    </PrivateRoute>
            </BrowserRouter>
        </>
    )
}

export default App;