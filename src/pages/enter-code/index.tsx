import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  BackgroundImage,
  BackgroundCirclesImage,
  Button,
  InputCode
} from './../../components';
import { } from './../../actions';
import { ApplitcationState } from '../../reducers';
import { IonPage } from '@ionic/react';

interface Props extends RouteComponentProps { }

class EnterCodePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="enter-code-page">
        <BackgroundImage
          gradient="180deg, #000 0%, #000 100%"
          image={BackgroundCirclesImage}
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
                <h1 className="title center-align">Enter Verification Code</h1>
                <p>We sent a code to: <br />thesound@music.com</p>
              </div>
            </div>

            <div className="row">
              <div className="col s12  mt-40 input-div">
                <p>Enter the 6-digit code</p>
                <InputCode />
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
      </IonPage>
    );
  }
}

const mapStateToProps = ({ }: ApplitcationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(EnterCodePage));
