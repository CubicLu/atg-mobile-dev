import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProfilePage from './index';

describe('ProfilePage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><ProfilePage /></Router>);
        expect(content).toBeDefined();
  });
  
});
