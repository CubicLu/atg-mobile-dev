import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './../../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { RouteComponentProps } from 'react-router';
import { DashboardMenuPage } from '../..';

interface MatchParams {
  artistId: string;
}
interface Props extends RouteComponentProps<MatchParams> { }

const propsComponent: Props = {
  match: { params: { artistId: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}

describe('DashboardMenuPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><DashboardMenuPage {...propsComponent} /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
