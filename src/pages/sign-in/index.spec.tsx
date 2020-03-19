import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignInPage from './index';
import { Provider } from 'react-redux';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('SignInPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><SignInPage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
  
});
