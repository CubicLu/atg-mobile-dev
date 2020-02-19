import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SearchPage from './index';

describe('SearchPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><SearchPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
