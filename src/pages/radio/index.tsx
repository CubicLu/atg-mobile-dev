import React from 'react';
import { IonPage } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

class RadioPage extends React.Component<Props> {
  enableGesture(): void {
    const mini = document.getElementById('radio');
    if (mini?.id !== 'radio') return;
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
    return (
      <IonPage id="radio-page">
        <div></div>
      </IonPage>
    );
  }
}

export default withRouter(RadioPage);
