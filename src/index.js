import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from "./store/reducer";
import combineReducers from "redux/src/combineReducers";
import createSagaMiddleware from 'redux-saga';
import {watchSaga} from './store/saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    app: reducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchSaga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter {/*basename="/my-locations-saga/"*/}>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));