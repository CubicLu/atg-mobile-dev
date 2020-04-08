import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import SettingPage from './index';
import {store} from '../../store';
import ReactDOM from 'react-dom';

describe('SettingPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><SettingPage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
