import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileArtistsPage from './index';
import { Provider } from 'react-redux';
import {store} from './../../../store';
import ReactDOM from 'react-dom';


describe('ProfileArtistsPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><ProfileArtistsPage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
  
});
