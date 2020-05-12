import React from 'react';
import { render } from '@testing-library/react';
import DiscoveryPage from './index';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter } from 'react-router-dom';

describe('Discovery render', () => {
  it("render without crash", async () => {
        let content = render(<Provider store={store}><BrowserRouter><DiscoveryPage /></BrowserRouter></Provider>);
        expect(content).toBeDefined();
  });
  
});
