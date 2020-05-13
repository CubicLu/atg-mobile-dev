import React from 'react';
import SliderRadiosComponent from './index';
import ReactDOM from 'react-dom';

describe('SliderRadiosComponent render', () => {
    it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<SliderRadiosComponent/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
