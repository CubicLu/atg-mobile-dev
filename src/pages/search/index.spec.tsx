import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from './index';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('SearchPage render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <SearchPage></SearchPage>
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
