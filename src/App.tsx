import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';

import './theme/scss/_styles.scss';

import { InitialPage, SignUpPage, EnterCodePage, SignInPage } from './pages';

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
          <IonReactRouter>
            <IonRouterOutlet>
              <IonContent
                scrollEvents={true}
                onIonScrollStart={(): any => {}}
                onIonScroll={(): any => {}}
                onIonScrollEnd={(): any => {}}
              >
                <Route path="/initial" component={InitialPage} exact={true} />
                <Route path="/sign-up" component={SignUpPage} exact={true} />
                <Route path="/enter-code" component={EnterCodePage} exact={true} />
                <Route path="/sign-in" component={SignInPage} exact={true} />
                <Route
                  exact
                  path="/"
                  render={(): any => <Redirect to="/initial" />}
                />
              </IonContent>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Provider>
    );
  }
}

export default App;
