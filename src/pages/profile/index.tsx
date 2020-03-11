import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
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
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg, #691de3, #20043b"
            backgroundTop
            backgroundTopOpacity={0.05}
            backgroundStyle={{ height: 'auto' }}
          >
            <div
              className={
                `profile-page` + (this.props.isPlaying && ' is-playing')
              }
            >
              <HeaderProfile />
              <Menu
                tabs={this.props.fanTabs}
                activeId={this.props.activeFanTab}
                onClick={(event: MenuInterface): void => {
                  return this.props.updateSettingsProperty(
                    'activeFanTab',
                    event.id
                  );
                }}
              />
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
          </BackgroundImage>
        </IonContent>
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
