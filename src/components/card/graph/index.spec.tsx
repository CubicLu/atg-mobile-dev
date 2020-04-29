import React from 'react';
import CardGraphComponent from './index';
import ReactDOM from 'react-dom';

describe('CardGraphComponent render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<CardGraphComponent />, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
