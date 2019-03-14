import testRenderer  from 'react-test-renderer';
import React from 'react';
import App from '../App';

describe('renders without crashing', () => {
    const testRenderer = testRenderer.create(<App/>);

    expect(testRenderer.toJSON()).toMatchSnapshot();
});


