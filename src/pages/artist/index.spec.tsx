import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import BlankPage from './index';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('BlankPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
