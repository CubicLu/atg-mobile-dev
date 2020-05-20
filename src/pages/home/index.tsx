import React from 'react';
import {
  ModalSlide,
  Player,
  NavbarTwoButtons,
  ActionSheet
} from './../../components';
import { HomeRouterPage } from './..';
import { IonReactRouter } from '@ionic/react-router';

export default class HomePage extends React.PureComponent<{}> {
  render(): React.ReactNode {
    return (
      <>
        <IonReactRouter>
          <ModalSlide />
          <ActionSheet />
          <Player />
          <HomeRouterPage />
          <NavbarTwoButtons />
        </IonReactRouter>
      </>
    );
  }
}
