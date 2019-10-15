import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './modules/configStore';

const render = Component => {
    return ReactDOM.render(
        <Provider store={store}>
            <Component/>
        </Provider>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}