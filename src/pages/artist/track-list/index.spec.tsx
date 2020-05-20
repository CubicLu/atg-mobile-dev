import React from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { store } from '../../../store';
import BlankPage from '../../blank'
interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> { 
}

const propsComponent: Props = {
  match: { params: { id: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}

describe('ArtistPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><BlankPage {...propsComponent} /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
