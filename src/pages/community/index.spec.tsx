import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CommunityPage from './index';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('CommunityPage render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Provider store={store}>
      <Router><CommunityPage /></Router></Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
  });
  
});
