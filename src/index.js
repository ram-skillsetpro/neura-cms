import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(<App />);


//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
