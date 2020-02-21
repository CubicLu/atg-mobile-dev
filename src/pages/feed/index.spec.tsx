import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import FeedPage from './index';

describe('FeedPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><FeedPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
