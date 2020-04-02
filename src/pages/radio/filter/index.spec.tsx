import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RadioFilterPage from './index';

describe('RadioFilterPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><RadioFilterPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
