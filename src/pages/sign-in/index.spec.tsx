import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SignInPage from './index';

describe('SignInPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><SignInPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
