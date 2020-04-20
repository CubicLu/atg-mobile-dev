import React from 'react';
import { render } from '@testing-library/react';
import FeedPage from './index';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('FeedPage render', () => {
  it("render without crash", async () => {
        let content = render(<Provider store={store}><FeedPage /></Provider>);
        expect(content).toBeDefined();
  });
  
});
