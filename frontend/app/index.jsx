import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './assets/sass/main.scss';
import 'leaflet/dist/leaflet.css'
import App from './components/App';
import configureStore from './configureStore';

import { initializeFirebase } from './services/push-notification';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

initializeFirebase();