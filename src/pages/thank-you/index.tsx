import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { BackgroundImage, Button } from './../../components';
import CheckIcon from '../../components/icon/check';
import { Colors, Sizes, GradientDirection } from '../../interfaces';

interface Props extends RouteComponentProps {
  artistId: string;
}

class ThankYouPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="thank-you-page">
        <IonContent scrollY={false}>
          <BackgroundImage
            gradient="180deg, #FDD105 0%, #C16509 100%"
            backgroundTop
            backgroundTopDark={true}
            backgroundBottom
            backgroundBottomDark={false}
            backgroundBottomOpacity={0.33}
          />
          <div className="thank-you-page mx-3">
            <div className="space-between h-100">
              <div className="row">
                <div className="col s12">
                  <CheckIcon />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h1>
                    Thank you for <br /> your support!
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h2>
                    Now you will enjoy UNLIMITED <br />
                    streams, videos, bonus content, <br />
                    community, chat and more!
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <Button
                    bold
                    size={Sizes.lg}
                    gradientDirection={GradientDirection.vertical}
                    label="Continue Listening"
                    gradient={true}
                    onClick={(): void => {
                      this.props.history.push(
                        `/home/artist/${this.props.artistId}`
                      );
                    }}
                    color={Colors.secondary}
                  />
                </div>
              </div>
            </div>
            <div className="row link">
              <div className="col s12">
                <p
                  onClick={(): void => {
                    this.props.history.push(`/home/profile`);
                  }}
                >
                  Need to make changes? <br />
                  Go to your account.
                </p>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(ThankYouPage);
