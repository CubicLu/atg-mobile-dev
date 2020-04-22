import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import './theme/variables.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './theme/variables.css';

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
import { hideKeyboard, showKeyboard, didShowKeyboard } from './utils';
import { CordovaList } from './components';

export default class App extends React.Component {
  authenticated: boolean = true;
  enableMedia?: boolean = false;

  UNSAFE_componentWillMount(): void {
    this.loadCordova();
    setupConfig({
      animated: true,
      swipeBackEnabled: false
    });
  }

  loadCordova(): void {
    document.addEventListener('deviceready', (): void => {
      console.log('cordova Loaded!');
      (window as any).deviceready = true;
      this.enableMedia = true;
      this.forceUpdate();
    });
    window.addEventListener('keyboardWillHide', (): void => {
      window.Keyboard.isVisible && hideKeyboard();
    });
    window.addEventListener('keyboardWillShow', (): void => {
      showKeyboard();
    });
    window.addEventListener('keyboardDidShow', (): void => {
      didShowKeyboard();
    });
  }

  render(): React.ReactNode {
    store.subscribe((): void => {
      if (this.authenticated) return; //temporary to debug
      const { loggedUser } = store.getState().authAPI;
      if (this.authenticated === !!loggedUser) return;
      this.authenticated = !!loggedUser;
      this.forceUpdate();
    });

    if (this.authenticated) {
      return (
        <Provider store={store}>
          <IonApp>
            <HomePage />
            {this.enableMedia && <CordovaList />}
          </IonApp>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id="notLogged" mode="ios">
              <Route exact path="/initial" component={InitialPage} />
              <Route exact path="/sign-in" component={SignInPage} />
              <Route exact path="/sign-up" component={SignUpPage} />
              <Route exact path="/enter-code" component={EnterCodePage} />
              <Route
                exact
                path="/sign-up-confirm"
                component={SignUpConfirmPage}
              />
              <Redirect from="*" to="/initial" />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Provider>
    );
  }
}
