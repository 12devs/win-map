import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import middlewares from './middlewares/index';

// import rootReducer from './reducers';

export default function configureStore(initState) {
    return createStore(
        // rootReducer,
        // initState,
        applyMiddleware.apply(this, middlewares),
    );
}
