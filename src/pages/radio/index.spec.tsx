import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import RadioPage from './index';
import { store } from './../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';

const props = {
  match: { params: { genre: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
};

describe('RadioPage render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <RadioPage {...props} />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
