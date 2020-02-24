import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProfileFriendsPage from './index';

describe('ProfileFriendsPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><ProfileFriendsPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
