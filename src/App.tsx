import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  SignUpPage,
  HomePage,
  SignInPage,
  EnterCodePage,
  SignUpConfirmPage,
  InitialPage
} from './pages';

import './theme/scss/_styles.scss';
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
export default class App extends React.Component {
  authenticated: boolean = true;

  render(): React.ReactNode {
    setupConfig({
      rippleEffect: false,
      hideCaretOnScroll: true,
      mode: 'ios'
    });
    store.subscribe((): void => {
      if (this.authenticated) return; //temporary to debug
      const { loggedUser } = store.getState().authAPI;
      if (this.authenticated === !!loggedUser) return;
      this.authenticated = !!loggedUser;
      this.forceUpdate();
    });

    const authenticated = <HomePage />;
    const notAuthenticated = (
      <IonRouterOutlet id="notLogged">
        <IonReactRouter>
          <Switch>
            <Route exact path="/initial" component={InitialPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/sign-up" component={SignUpPage} />
            <Route exact path="/enter-code" component={EnterCodePage} />
            <Route
              exact
              path="/sign-up-confirm"
              component={SignUpConfirmPage}
            />
            <Route path="/" render={(): any => <Redirect to="/initial" />} />
          </Switch>
        </IonReactRouter>
      </IonRouterOutlet>
    );

    return (
      <Provider store={store}>
        <IonApp>{this.authenticated ? authenticated : notAuthenticated}</IonApp>
      </Provider>
    );
  }
}
