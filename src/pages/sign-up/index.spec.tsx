import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SignUpPage from './index';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('SignUpPage render', () => {
  it("render without crash", async () => {
        let content = render(<Provider store={store}><Router><SignUpPage /></Router></Provider>);
        expect(content).toBeDefined();
  });
  
});
