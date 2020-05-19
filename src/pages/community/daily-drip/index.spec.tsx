import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './../../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { CommunityDailyDripPage } from '../..';

const props = {
  match: { params: { id: '3' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
};

describe('DailyDrip render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <CommunityDailyDripPage {...props} />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
