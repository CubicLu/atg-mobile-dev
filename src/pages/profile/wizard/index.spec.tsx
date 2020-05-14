import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import WizardPage from './index';
import {store} from './../../../store';
import ReactDOM from 'react-dom';

describe('WizardPage render', () => {
  it("render without crash", async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><WizardPage /></Router></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
