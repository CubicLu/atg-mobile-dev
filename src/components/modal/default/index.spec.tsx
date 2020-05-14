import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import DefaultModal from './index';
import { store } from './../../../store';
import ReactDOM from 'react-dom';
import { GenericModalInterface } from '../../../models';

const genericModal: GenericModalInterface[] = [{ name: '', url: '' }];
const props = {
  onClick: (data: GenericModalInterface[]): void => {},
  title: '',
  data: genericModal,
  overrideClick: false
};

describe('DefaultModal render', () => {
  it('render without crash', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <DefaultModal {...props}></DefaultModal>
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
