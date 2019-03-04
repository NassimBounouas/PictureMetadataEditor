import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// =======================================