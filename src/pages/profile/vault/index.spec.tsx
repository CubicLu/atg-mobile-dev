import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProfileVaultPage from './index';

describe('ProfileVaultPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><ProfileVaultPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
