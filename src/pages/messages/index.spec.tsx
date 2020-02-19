import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import MessagesPage from './index';

describe('MessagesPage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><MessagesPage /></Router>);
        expect(content).toBeDefined();
  });
  
});
