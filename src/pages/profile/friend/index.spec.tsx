import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import FriendProfilePage from './index';
import { store } from '../../../store';
import { Provider } from 'react-redux';

describe('FriendProfilePage render', () => {
  it('render without crash', async () => {
    let content = render(
      <Provider store={store}>
        <Router>
          <FriendProfilePage />
        </Router>
      </Provider>
    );
    expect(content).toBeDefined();
  });
});
