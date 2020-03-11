import React from 'react';
import {  Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './index';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react';

const mockStore = configureStore([]);

describe('HomePage render', () => {
    let store: any;
    let component: any;
  
    beforeEach(() => {
        store = mockStore({
          settings: { active_tab: 'home '},
        });

        const history = createMemoryHistory()
        history.push('route')
        // component = render(
        //   <Provider store={store}>
        //     <Router history={history} ><HomePage  /></Router>
        //   </Provider>
        // );
    });

    it("render without crash", async () => {
        // expect(component.toJSON()).toMatchSnapshot();
    });
  
});
