import React from 'react';
import { connect } from 'react-redux';
import { IonPage } from '@ionic/react';
import {
  BackgroundImage,
  HeaderProfile,
  Menu,
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

interface Props extends StateProps, DispatchProps {}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

class ProfilePage extends React.Component<Props> {
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.loading) return;
  }
  render(): React.ReactNode {
    const {
      isPlaying,
      fanTabs,
      activeFanTab,
      updateSettingsProperty,
      loading
    } = this.props;
    if (!fanTabs) return <IonPage />;
    return (
      <IonPage id="profile-page">
        <BackgroundImage
          gradient="180deg,#6A1EE4,#1e053b"
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.15}
          backgroundBottom
          backgroundBottomDark={false}
          bottomRotate={true}
          backgroundBottomOpacity={0.15}
        />
        <div className={`profile-page` + (isPlaying && ' is-playing')}>
          <HeaderProfile />
          <Menu
            tabs={fanTabs}
            activeId={activeFanTab}
            onClick={(event: MenuInterface): void => {
              return updateSettingsProperty('activeFanTab', event.id);
            }}
          />
          {fanTabs.map(
            (data, i): React.ReactNode =>
              data.id === activeFanTab &&
              React.createElement(data.component, { key: i })
          )}
        </div>
        <LoaderFullscreen visible={loading} />
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
