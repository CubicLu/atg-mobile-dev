import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import MessageNotificationsPage from './index';
import {store} from '../../../store';
import ReactDOM from 'react-dom';

describe('MessageNotificationsPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><MessageNotificationsPage /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
