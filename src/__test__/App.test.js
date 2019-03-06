import {render} from 'react-testing-library';
import React from 'react';
import App from '../App';

test('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Learn React')).toBeInTheDocument();
});


