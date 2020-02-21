import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RadioPage from './index';

describe('RadioPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><RadioPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
