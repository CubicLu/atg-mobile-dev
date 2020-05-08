import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonPage, IonList, IonItem } from '@ionic/react';
import { ApplicationState } from './../../reducers';
import {
  Header,
  BackgroundImage,
  ArrowRightIcon,
  Button
} from '../../components';
import { MenuInterface, Colors, ShapesSize, Sizes } from '../../interfaces';

interface StateProps {
  settingsMenu: MenuInterface[];
}
interface Props extends StateProps {}

class SettingsPage extends React.Component<Props> {
  render(): React.ReactNode {
    const { settingsMenu } = this.props;
    return (
      <div className="settings-page">
        <IonPage id="settings-page">
          <BackgroundImage default />
          <Header title="Settings" />
          <IonContent>
            <IonList lines="none">
              {settingsMenu.map(
                (value, i): React.ReactNode => {
                  return (
                    <IonItem key={i}>
                      <div>
                        <span>{value.label}</span>
                        <span>
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </IonItem>
                  );
                }
              )}
            </IonList>
          </IonContent>
          <div className="footer" slot="fixed">
            <div className="row">
              <div className="col s12 flex-justify-content-center">
                <Button
                  label="Log Out"
                  color={Colors.gray}
                  gradient
                  size={Sizes.xl}
                  bold
                  type={ShapesSize.rounded}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 flex-justify-content-center">
                <span className="f7">Version 0.0.0 Build 0000</span>
              </div>
            </div>
          </div>
        </IonPage>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { settingsMenu } = settings;
  return { settingsMenu };
};

export default connect(mapStateToProps, {})(SettingsPage);
