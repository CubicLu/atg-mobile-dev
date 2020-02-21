import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EnterCodePage from './index';

describe('EnterCodePage render', () => {
  it("render without crash", async () => {
        let content = render(<Router><EnterCodePage /></Router>);
        expect(content).toBeDefined();
  });
  
});
