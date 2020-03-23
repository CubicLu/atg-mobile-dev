import React from 'react';
<<<<<<< HEAD
import { IonPage } from '@ionic/react';
=======
import { IonPage, Gesture, GestureConfig, createGesture } from '@ionic/react';
>>>>>>> b613ff3d093cd4b800d9a4f2bf43503a45201bbf
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

class RadioPage extends React.Component<Props> {
  gestureMini: Gesture | undefined;

  enableGesture(): void {
    const mini = document.getElementById('radio');
    if (mini?.id !== 'radio') return;
    const gestureConfigMini: GestureConfig = {
      el: mini,
      direction: 'x',
      gestureName: 'radioMove',
      gesturePriority: 20,
      passive: true,
      onMove: this.touchMove.bind(this),
      onEnd: this.touchEnd.bind(this)
    };
    this.gestureMini = createGesture(gestureConfigMini);
    this.gestureMini.enable();
    console.log(this.gestureMini);
  }

  componentDidMount(): void {
    this.enableGesture();
  }

  iterate(): void {
    console.log(1);
  }
  touchEnd(e): void {
    console.log(e);
  }

  touchMove(e): void {
    console.log(e);
  }

  render(): React.ReactNode {
    if (!this.gestureMini) this.enableGesture();
    return (
      <IonPage id="radio-page">
        <div></div>
      </IonPage>
    );
  }
}

export default withRouter(RadioPage);
