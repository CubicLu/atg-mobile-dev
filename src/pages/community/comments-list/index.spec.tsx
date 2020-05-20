import React from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import CommunityCommentsListPage from './index';
import {store} from '../../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
interface Props extends RouteComponentProps { 
}

const propsComponent: Props = {
  match: { params: { id: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}

describe('CommunityCommentsListPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><CommunityCommentsListPage {...propsComponent} /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
