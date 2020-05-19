import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import CommunityArtistPage from './index';
import { store } from '../../../store';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  artistId: string;
}
interface Props extends RouteComponentProps<MatchParams> { }

const propsComponent: Props = {
  match: { params: { artistId: 'pharrell-williams' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory()
}
describe('CommunityArtistPage render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><CommunityArtistPage {...propsComponent} /></Router></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
