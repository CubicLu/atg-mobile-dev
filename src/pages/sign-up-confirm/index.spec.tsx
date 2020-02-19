import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SignUpConfirmPage from './index';

describe('SignUpConfirmPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><SignUpConfirmPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
