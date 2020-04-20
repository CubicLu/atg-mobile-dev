import React, { useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { RadioStationEditPage } from '../..';
import { store } from '../../../store';

describe('BlankPage render', () => {
  const div = document.createElement('div');
  it("render without crash", async () => {
        ReactDOM.render(<Router><Provider store={store}><RadioStationEditPage /></Provider></Router>, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});
