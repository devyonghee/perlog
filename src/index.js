import React from 'react';
import ReactDOM from 'react-dom';
import BaseLayout from './layouts/BaseLayout';

const render = Component => {
    return ReactDOM.render(
        <Component/>,
        document.getElementById('root')
    );
};

render(BaseLayout);

if (module.hot) {
    module.hot.accept('./layouts/BaseLayout', () => {
        const NextApp = require('./layouts/BaseLayout').default;
        render(NextApp);
    });
}