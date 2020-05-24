import React from 'react';
import SliderRadioCardComponent from './index';
import ReactDOM from 'react-dom';

describe('SliderRadioCardComponent render', () => {
    it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<SliderRadioCardComponent/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
