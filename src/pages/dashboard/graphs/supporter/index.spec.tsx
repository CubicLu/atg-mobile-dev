import React from 'react';
import { BrowserRouter as Router, RouteChildrenProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import DashboardSupporterPage from './index';
import {store} from './../../../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';

interface MatchParams {
  artistId: string;
}
interface Props
  extends
  RouteChildrenProps<MatchParams> { }

const propsComponent: Props = {
  match: { params: { artistId: 'pharrell-williams' }, isExact: true, path: "", url: ""},
  history: createMemoryHistory(),
  location: {hash: "", pathname: "", search: "", state: "", key: ""}
  
}

describe('DashboardSupporterPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><DashboardSupporterPage {...propsComponent} /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
