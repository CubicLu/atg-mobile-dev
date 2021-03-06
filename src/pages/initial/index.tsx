import React from 'react';
import { IonPage } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundInitialImage,
  Button
} from './../../components';
import { connect } from 'react-redux';
import { updateAuthProperty } from './../../actions';
import { Sizes, ShapesSize, Colors } from '../../types';

interface Props extends DispatchProps {}
interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}

class InitialPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="initial-page">
        <BackgroundImage
          backgroundImage={BackgroundInitialImage}
          shadow
          legend="Celeste Waite"
        />
        <div className="initial-page-fullscreen double-top">
          <div className="space-between h-100">
            <div className="h-25">
              <div className="brand-title">panthr</div>
              <div className="mx-25 h2 bold">ARTIST-TO-FAN</div>
            </div>

            <div className="flex-compass fluid h-50 south west">
              <h1 className="title-album">
                THE
                <br />
                ULTIMATE
              </h1>
              <span className="initial-description bold h1">
                DESTINATION FOR ARTIST & FANS
              </span>
            </div>

            <div className="footer fluid h-16">
              <div className="pb-1">
                <Button
                  routerLink="/sign-in"
                  routerDirection="forward"
                  size={Sizes.lg}
                  color={Colors.primary}
                  gradient={true}
                  label="Sign In"
                  type={ShapesSize.full}
                />
              </div>
              <div className="pb-2">
                <Button
                  routerLink="/sign-up"
                  routerDirection="forward"
                  size={Sizes.lg}
                  label="Create an account"
                  type={ShapesSize.full}
                  color={Colors.transparent}
                />
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default connect(null, { updateAuthProperty })(InitialPage);
