import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonHeader } from '@ionic/react';
import {
  BackgroundImage,
  HeaderProfile,
  Menu,
  _,
  LoaderFullscreen
} from './../../components';
import { ApplicationState } from './../../reducers';
import { updateSettingsProperty } from './../../actions';
import { MenuInterface } from '../../interfaces';

interface StateProps {
  activeFanTab: string;
  fanTabs: MenuInterface[];
  isPlaying: boolean;
  loading: boolean;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props extends StateProps, DispatchProps {}

class ProfilePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="profile-page">
        <div
          className={`profile-page` + (this.props.isPlaying && ' is-playing')}
        >
          <BackgroundImage
            gradient="180deg,#6A1EE4,#1e053b"
            backgroundTopDark
            backgroundTop
            backgroundTopOpacity={0.15}
            backgroundBottom
            backgroundBottomDark={false}
            backgroundBottomOrange={true}
            backgroundBottomOpacity={0.3}
          />
          <IonHeader className="ion-no-border">
            <HeaderProfile />
            <Menu
              className="scroll-x list-fit"
              tabs={this.props.fanTabs}
              activeId={this.props.activeFanTab}
              onClick={(event: MenuInterface): void => {
                return this.props.updateSettingsProperty(
                  'activeFanTab',
                  event.id
                );
              }}
            />
          </IonHeader>
          {_.map(
            this.props.fanTabs,
            (data, i): React.ReactNode => {
              if (data.id === this.props.activeFanTab) {
                return React.createElement(data.component, { key: i });
              }
              return null;
            }
          )}
        </div>
        <LoaderFullscreen visible={this.props.loading} />
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { activeFanTab, fanTabs, isPlaying } = settings;
  const { loading } = artistAPI;
  return { activeFanTab, fanTabs, isPlaying, loading };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(ProfilePage);
