import React from 'react';
import ToastComponent from './index';
import ReactDOM from 'react-dom';

describe('ToastComponent render', (): void => {
  it('render without crash', async (): Promise<void> => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ToastComponent
        clickId={'toastClick'}
        clickHandler={(): void => {}}
        message={
          '<span>Added to your <a href="#" id="toastClick">VAULT</a></span>'
        }
        hideToast={(): void => {}}
        classNames={'custom-toast'}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
