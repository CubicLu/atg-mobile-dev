import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SignUpPage from './index';

describe('SignUpPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><SignUpPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
