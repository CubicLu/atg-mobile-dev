import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostComments from './index';
import { store } from './../../../store';
import ReactDOM from 'react-dom';
import { CommentInterface } from '../../../models';

const comment: CommentInterface = {
  text: '',
  replies: null,
  user: { username: '' } as any
};

describe('PostComments render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <PostComments comment={comment}></PostComments>
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
