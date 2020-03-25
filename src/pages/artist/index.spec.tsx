import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './../../store';
import ReactDOM from 'react-dom';

describe('ArtistPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
          <Router>
            {/* <ArtistPage 
              location={{ pathname: 'artist', search: "", state: {}, hash: ""}
              history={{ length: 1, action: "REPLACE"  }} 
              staticContext={} 
              match={{params: { id: "pharell-williams"}}}
            /> */}
            </Router>
          </Provider>,
        div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
