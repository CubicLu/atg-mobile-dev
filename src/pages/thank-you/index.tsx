import React from 'react';
import { IonContent, IonPage, IonRouterLink } from '@ionic/react';
import { BackgroundImage, Button } from './../../components';
import CheckIcon from '../../components/icon/check';
import { Colors, Sizes, GradientDirection } from '../../interfaces';

interface Props {
  artistId: string;
}

class ThankYouPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="thank-you-page">
        <IonContent scrollY={false} fullscreen={true}>
          <BackgroundImage
            gradient="180deg, #FDD105 0%, #C16509 100%"
            backgroundTop
            backgroundTopDark={true}
            backgroundBottom
            backgroundBottomDark={false}
            backgroundBottomOpacity={0.33}
          />
          <div className="thank-you-page pt-8 pb-6 space-between h-100 f1 center-align">
            <div className="fluid">
              <CheckIcon />
              <div className="row mt-1 f0 l15">
                Thank you for <br /> your support!
              </div>
              <div className="row f4 l15">
                Now you will enjoy UNLIMITED <br />
                streams, videos, bonus content, <br />
                community, chat and more!
              </div>
            </div>

            <div className="row">
              <IonRouterLink routerLink="/profile" routerDirection="root">
                <Button
                  bold
                  size={Sizes.lg}
                  gradientDirection={GradientDirection.vertical}
                  label="Continue Listening"
                  gradient={true}
                  color={Colors.secondary}
                />
              </IonRouterLink>
            </div>

            <div className="row link f6">
              <IonRouterLink routerLink="/profile" routerDirection="back">
                <span className="f6">
                  Need to make changes? <br />
                  Go to your account.
                </span>
              </IonRouterLink>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default ThankYouPage;
