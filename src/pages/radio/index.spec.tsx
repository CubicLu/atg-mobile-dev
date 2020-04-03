import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import RadioPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('RadioPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><RadioPage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
  
});
