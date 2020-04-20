import React from 'react';
import {
  ModalSlide,
  Player,
  LoaderFullscreen,
  NavbarTwoButtons
} from './../../components';
import { HomeRouterPage } from './..';
import { IonReactRouter } from '@ionic/react-router';

export default class HomePage extends React.PureComponent<{}> {
  render(): React.ReactNode {
    return (
      <>
        <LoaderFullscreen />
        <IonReactRouter>
          <ModalSlide />
          <Player />
          <HomeRouterPage />
          <NavbarTwoButtons />
        </IonReactRouter>
      </>
    );
  }
}
