import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProfileArtistsPage from './index';

describe('ProfileArtistsPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><ProfileArtistsPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
