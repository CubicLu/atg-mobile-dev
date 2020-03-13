import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';

import './theme/scss/_styles.scss';

import {
  SignUpPage,
  HomePage,
  SignInPage,
  EnterCodePage,
  SignUpConfirmPage
} from './pages';

import { store } from './store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <IonApp>
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <IonReactRouter>
                <Switch>
                  <Route path="/initial" component={SignInPage} />
                  <Route path="/sign-up" component={SignUpPage} />
                  <Route path="/home" component={HomePage} />
                  <Route path="/sign-in" component={SignInPage} />
                  <Route path="/enter-code" component={EnterCodePage} />
                  <Route
                    path="/sign-up-confirm"
                    component={SignUpConfirmPage}
                  />
                  <Route
                    exact
                    path="/"
                    render={(): any => <Redirect to="/sign-in" />}
                  />
                </Switch>
              </IonReactRouter>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonApp>
      </Provider>
    );
  }
}

export default App;
