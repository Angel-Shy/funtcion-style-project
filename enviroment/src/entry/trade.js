import React from "react";
import ReactDOM from 'react-dom';
import '../sass/index.scss'
import App from "../components/apps/trade/App";
import {Provider} from  'react-redux';
import store from "../redux/store";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
