import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Tasks } from './tasks';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks: Tasks,
            auth: Auth,
            single: Tasks
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};