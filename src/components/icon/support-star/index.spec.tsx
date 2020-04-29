import React from 'react';
import SupportStarIcon from './index';
import ReactDOM from 'react-dom';

describe('SupportStarIcon render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<SupportStarIcon />, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
