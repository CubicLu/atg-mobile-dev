import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './../../../store';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { RouteComponentProps } from 'react-router';
import { ArtistGalleryGridPage } from '../..';
import { GalleryInterface } from '../../../models';

interface MatchParams {
  id: string;
  galleryId: string;
}
interface Props extends RouteComponentProps<MatchParams> { 
  album: GalleryInterface
}

const propsComponent: Props = {
  match: { params: { id: 'pharrell-williams', galleryId: '3' }, isExact: true, path: "", url: ""}, location: {hash: "", pathname: "", search: "", state: "", key: ""},
  history: createMemoryHistory(),
  album: {
    cover: '',
    name: '',
    quantity: 1,
    items: []
  }
}

describe('ArtistGalleryGridPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><ArtistGalleryGridPage {...propsComponent} /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
