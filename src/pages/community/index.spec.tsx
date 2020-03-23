import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import CommunityPage from './index';

describe('CommunityPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><CommunityPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
