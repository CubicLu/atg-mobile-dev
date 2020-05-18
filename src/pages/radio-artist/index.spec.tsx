import React from 'react';
import { BrowserRouter as Router, RouteChildrenProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import RadioArtistPage from './index';
import {store} from './../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
interface MatchParams {
  id: string;
}
interface Props
  extends
  RouteChildrenProps<MatchParams> { }

const propsComponent: Props = {
  match: { params: { id: 'pharrell-williams' }, isExact: true, path: "", url: ""},
  history: createMemoryHistory(),
  location: {hash: "", pathname: "", search: "", state: "", key: ""}
  
}

describe('RadioArtist render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><RadioArtistPage {...propsComponent} /></Router></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
