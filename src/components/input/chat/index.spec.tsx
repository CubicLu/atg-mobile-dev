import React from 'react';
import InputChat from '.';
import ReactDOM from 'react-dom';

describe('InputChat render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<InputChat />, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});