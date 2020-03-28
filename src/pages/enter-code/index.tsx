import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BackgroundImage, InputCode, Header } from './../../components';

import { IonPage } from '@ionic/react';

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
        <BackgroundImage
          gradient="180deg, #000000, #100914"
          backgroundTop
          backgroundTopDark={false}
          backgroundTopOpacity={0.13}
          backgroundBottom={true}
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.13}
        />
        <Header
          leftBackButton={true}
          rightCloseButton={true}
          rightCloseOnClick={(): any => this.props.history.push('/initial')}
        />
        <div className="initial-page-fullscreen double-top">
          <div className="space-between h-100">
            <div className="row">
              <div className="col s12">
                <h1 className="mt-40 h00 center-align">
                  Enter Verification Code
                </h1>

                <div className="f4 center-align">
                  We sent a code to: <br />
                  thesound@music.com
                </div>
              </div>
            </div>

            <div className="flex-compass h-100 medium">
              <div className="row">
                <div className="col s12 mt-40 input-div">
                  <div className="f4 center-align">Enter the 6-digit code</div>
                  <br />
                  <InputCode
                    onKeyUp={this.validToken.bind(this)}
                    isValid={this.state.isValid}
                  />
                </div>
              </div>
            </div>

            <div className="footer flex-compass h-100 north center">
              <div>
                <p className="didnt-receive">
                  I didn’t receive an email message
                </p>
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default EnterCodePage;
