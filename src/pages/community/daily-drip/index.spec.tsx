import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './../../../store';
import ReactDOM from 'react-dom';
import { CommunityPage } from '../..';

describe('BlankPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><CommunityPage /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
