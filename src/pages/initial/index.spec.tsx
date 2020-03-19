import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import InitialPage from './index';
import { Provider } from 'react-redux';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('InitialPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><InitialPage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
  
});
