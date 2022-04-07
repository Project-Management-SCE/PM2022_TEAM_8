import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/Store";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
