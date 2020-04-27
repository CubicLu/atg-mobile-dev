import React from 'react';
import { BrowserRouter as Router,  RouteChildrenProps } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import CommunityArtistPage from './index';
import { store } from '../../../store';
import ReactDOM from 'react-dom';
import { PostInterface, StorieInterface, CommunityArtistInterface } from '../../../interfaces';

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
describe('CommunityArtistPage render', () => {
  it("render without crash", async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><CommunityArtistPage {...propsComponent} /></Router></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
