import React from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {store} from './../../store';
import ReactDOM from 'react-dom';
import { VaultFilterPage } from '..';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> { 
}
const propsComponent: Props = {
  match: { params: { reference: 'artist', referenceId: 'pharrell-williams', id: '1' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}

describe('BlankPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><VaultFilterPage {...propsComponent} /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
