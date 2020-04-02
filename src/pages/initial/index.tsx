import React from 'react';
import { IonPage, IonRouterLink } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundInitialImage,
  Button
} from './../../components';
import { connect } from 'react-redux';
import { updateAuthProperty } from './../../actions';
import { ApplicationState } from '../../reducers';
import { Sizes, ShapesSize, Colors } from '../../interfaces';

interface Props extends DispatchProps {}
interface StateProps {}
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
            <div className="row h-25">
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

            <div className="footer row fluid">
              <div className="row">
                <IonRouterLink routerLink="/sign-in" routerDirection="forward">
                  <Button
                    size={Sizes.lg}
                    gradient={true}
                    label="Sign In"
                    type={ShapesSize.full}
                  />
                </IonRouterLink>
              </div>
              <div className="row">
                <IonRouterLink routerLink="/sign-up" routerDirection="forward">
                  <Button
                    size={Sizes.lg}
                    label="Create an account"
                    type={ShapesSize.full}
                    color={Colors.transparent}
                  />
                </IonRouterLink>
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default connect(mapStateToProps, { updateAuthProperty })(InitialPage);
