import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyBioPage from './index';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store';

describe('MyBioPage render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><MyBioPage /></Router></Provider>, div);
        expect(div).toBeDefined();
        ReactDOM.unmountComponentAtNode(div);
  });

});
