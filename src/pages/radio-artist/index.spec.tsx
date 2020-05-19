import React from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { RadioArtistPage } from '..';
interface MatchParams {
  id: string;
}
interface Props
  extends
  RouteComponentProps<MatchParams> { }

const propsComponent: Props = {
  match: { params: { id: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}

describe('RadioArtistPage render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><RadioArtistPage {...propsComponent} /></Router></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
