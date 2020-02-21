import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

describe('App initializate ', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
});
