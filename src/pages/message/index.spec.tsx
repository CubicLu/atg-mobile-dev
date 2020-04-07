import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import MessagePage from './index';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('MessagePage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><MessagePage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
