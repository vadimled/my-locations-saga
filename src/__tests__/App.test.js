import React from 'react';
import App from '../App';
import {MemoryRouter} from "react-router-dom";
import {mount} from "enzyme";
import List from "../containers/List";
import {watchSaga} from "../store/saga";
import combineReducers from "redux/src/combineReducers";
import reducer from "../store/reducer";
import thunk from "redux-thunk/index";
import {applyMiddleware, compose, createStore} from "redux/index";
import createSagaMiddleware from "redux-saga/index";
import {Provider} from "react-redux";

describe('Layout State', () => {
    before('render and locate element', function () {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const rootReducer = combineReducers({
            app: reducer
        });

        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

        sagaMiddleware.run(watchSaga);

        this.store = store;
    });
    it('invalid path should redirect to 404', () => {
        const wrapper = mount(
            <Pro vider store={store}>
                <MemoryRouter initialEntries={['/random']}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(List)).toHaveLength(0);
    });
});


/*(it('should show two buttons ', () => {
    const newHistory = createBrowserHistory();
    const div = document.createElement('div');

    ReactDOM.render(<Router history={newHistory}><App /></Router>, div);

 ReactDOM.unmountComponentAtNode(div);

});
'renders without crashing', () => {



    const component = renderer.create(
        <Link page="http://www.facebook.com">Facebook</Link>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});
*/