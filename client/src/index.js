import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import {Provider} from "react-redux";
import store from './modules/configStore';

const render = Component => {
    return ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementsByTagName('body').item(0)
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('components/App').default;
        render(NextApp);
    });
}