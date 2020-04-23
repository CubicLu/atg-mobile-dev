import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileMixtapesPage from './index';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store';

describe('ProfileMixtapesPage render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><ProfileMixtapesPage /></Router></Provider>, div);
        expect(div).toBeDefined();
        ReactDOM.unmountComponentAtNode(div);
  });
  
});
