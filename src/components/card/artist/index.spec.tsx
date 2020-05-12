import React from 'react';
import CardArtistComponent from './index';
import ReactDOM from 'react-dom';
import { ArtistInterface } from '../../../models';
import { store } from '../../../store';
import { Provider } from 'react-redux';

const artist: ArtistInterface = {
    cover: {
        main: "https://frontend-mocks.s3.us-west-1.amazonaws.com/artists/bono-vox/artist.png", 
        background: "https://frontend-mocks.s3.us-west-1.amazonaws.com/artists/bono-vox/artist.png", 
        event: "https://frontend-mocks.s3.us-west-1.amazonaws.com/artists/bono-vox/artist.png",
        biography: "",
        deepDive: ""
    },
    name: "Bono Vox",
    support: false,
    username: "bono-vox"
};

describe('CardArtistComponent render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><CardArtistComponent artist={artist} key={0} /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
