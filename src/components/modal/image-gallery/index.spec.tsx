import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import FullScreenImageModal from './index';
import { store } from './../../../store';
import ReactDOM from 'react-dom';

let props = {
  currentGallery: null,
  galleryLength: 1,
  changePage: (): void => {}
};

describe('ImageGalleryModal render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <FullScreenImageModal {...props}>
            <p>test</p>
          </FullScreenImageModal>
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
