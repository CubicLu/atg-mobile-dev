import React from 'react';
import CardRadioComponent from './index';
import ReactDOM from 'react-dom';

describe('PlayerComponent render', () => {
    it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<CardRadioComponent id={0} canEdit time={0}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
