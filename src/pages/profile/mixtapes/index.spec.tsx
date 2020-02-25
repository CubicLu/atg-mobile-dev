import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProfileMixtapesPage from './index';

describe('ProfileMixtapesPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><ProfileMixtapesPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
