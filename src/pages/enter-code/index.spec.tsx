import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EnterCodePage from './index';
import { createMemoryHistory } from 'history';

const props = {
  match: { params: { artistId: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
};

describe('EnterCodePage render', () => {
  it('render without crash', async () => {
    let content = render(
      <Router>
        <EnterCodePage {...props} />
      </Router>
    );
    expect(content).toBeDefined();
  });
});
