import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProfileFriendsPage from './index';
import { store } from '../../../store';
import { Provider } from 'react-redux';

describe('ProfileFriendsPage render', () => {
  it('render without crash', async () => {
    let content = render(
      <Provider store={store}>
        <Router>
          <ProfileFriendsPage />
        </Router>
      </Provider>
    );
    expect(content).toBeDefined();
  });
});
