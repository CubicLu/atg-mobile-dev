import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RadioStationEditPage from './index';
import { Provider } from 'react-redux';
import { store } from '../../../store';

describe('BlankPage render', () => {
  it("render without crash", async () => {
        let content = render(<Provider store={store}><Router><RadioStationEditPage /></Router></Provider>);
        expect(content).toBeDefined();
  });
});
