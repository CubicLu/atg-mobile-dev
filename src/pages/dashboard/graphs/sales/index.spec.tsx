import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import DashboardAnalyticDetailPage from './index';
import { store } from './../../../../store';
import ReactDOM from 'react-dom';

let props = {
  location: { hash: '', pathname: '', search: '', state: '', key: '' },
  match: {
    params: { artistId: 'pharrell-williams' },
    isExact: true,
    path: '',
    url: ''
  },
  history: {
    goBack: (): void => {}
  }
};

describe('DashboardAnalyticDetailPage render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <DashboardAnalyticDetailPage {...props} />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
