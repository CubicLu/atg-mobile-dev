import React from 'react';
import ToastComponent from './index';
import ReactDOM from 'react-dom';

describe('ToastComponent render', (): void => {
  it('render without crash', async (): Promise<void> => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ToastComponent
        clickHandler={(): void => {}}
        hideToast={(): void => {}}
        classNames={'custom-toast'}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
