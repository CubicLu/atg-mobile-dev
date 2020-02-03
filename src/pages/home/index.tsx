import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";


interface Props{
  actions: any; //typeof AnyActions 
}


class HomePage extends React.Component<Props>{

  constructor(props: Props){ 
    super(props)
  }

  render(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          The world is your oyster.
          <p>
            If you get lost, the{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
              docs
            </a>{' '}
            will be your guide.
          </p>
        </IonContent>
      </IonPage>
    );
  }

}


const mapStateToProps = ({  }) => {
  return {  };
}
export default connect(mapStateToProps, {

})(HomePage);
