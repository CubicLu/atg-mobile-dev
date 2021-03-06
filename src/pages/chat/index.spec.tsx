import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import ChatPage from './index';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('ChatPage render', () => {
  it("render without crash", async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><ChatPage /></Router></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
