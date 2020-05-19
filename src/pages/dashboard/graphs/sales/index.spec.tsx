import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import DashboardAnalyticDetailPage from './index';
import { store } from './../../../../store';
import { createMemoryHistory } from 'history';
import ReactDOM from 'react-dom';

let props = {
  match: { params: { artistId: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
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
