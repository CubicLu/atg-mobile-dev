import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RadioStationEditPage from './index';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { createMemoryHistory } from 'history';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> { }

const propsComponent: Props = {
  match: { params: { id: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}

describe('RadioStationEditPage render', () => {
  it("render without crash", async () => {
        let content = render(<Provider store={store}><Router><RadioStationEditPage /></Router></Provider>);
        expect(content).toBeDefined();
  });
});
