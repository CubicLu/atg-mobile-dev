import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import InitialPage from './index';

describe('InitialPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><InitialPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
