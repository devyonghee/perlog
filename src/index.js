import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import * as serviceWorker from 'serviceWorker';


const render = Component => {
    return ReactDOM.render(
        <Component/>,
        document.getElementById('root')
    );
};

serviceWorker.unregister();
render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}