import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  BackgroundImage,
  Button,
  InputCode,
  CirclesIcon
} from './../../components';
import {} from './../../actions';
import { IonPage, IonContent } from '@ionic/react';

interface State {
  isValid: boolean;
}
interface Props extends RouteComponentProps {}

class EnterCodePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isValid: true
    };
  }

  validToken(event: any): void {
    const token: string = event.target.value;
    if (this.state.isValid === false) this.setState({ isValid: true });
    if (token.length === 6) {
      if (token === '123456') {
        this.props.history.push('/sign-up-confirm');
      } else {
        this.setState({ isValid: false });
      }
    }
  }

  render(): React.ReactNode {
    return (
      <IonPage id="enter-code-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg, #000 0%, #000 100%"
            top
            bottom
            topIsSvg
            bottomIsSvg
            imageTop={<CirclesIcon color={'#343434'} />}
            imageBottom={<CirclesIcon color={'#343434'} />}
            unique={false}
          >
            <div className="container enter-code-page">
              <div className="row ">
                <div className="col s12 right-align mt-20">
                  <Button
                    color="transparent"
                    onClick={(): any => this.props.history.push('/')}
                    label="Skip"
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col s12">
                  <h1 className="title center-align">
                    Enter Verification Code
                  </h1>
                  <p>
                    We sent a code to: <br />
                    thesound@music.com
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col s12  mt-40 input-div">
                  <p>Enter the 6-digit code</p>
                  <InputCode
                    onKeyUp={this.validToken.bind(this)}
                    isValid={this.state.isValid}
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col s12">
                  <p className="didnt-receive">
                    I didn’t receive an email message
                  </p>
                </div>
              </div>
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(EnterCodePage);
