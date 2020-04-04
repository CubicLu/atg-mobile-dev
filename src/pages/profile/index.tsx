import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import { BackgroundImage, HeaderProfile, Menu } from './../../components';
import { ApplicationState } from './../../reducers';
import { updateSettingsProperty } from './../../actions';
import { MenuInterface } from '../../interfaces';

interface StateProps {
  activeFanTab: string;
  fanTabs: MenuInterface[];
  isPlaying: boolean;
}

interface Props extends StateProps, DispatchProps {}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

class ProfilePage extends React.Component<Props> {
  changeFanTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeFanTab) return;
    this.props.updateSettingsProperty('activeFanTab', event.id);
  };
  renderActiveTab(): React.ReactNode {
    const { fanTabs, activeFanTab } = this.props;
    const tab = fanTabs.find((x): boolean => x.id === activeFanTab)!;
    return React.createElement(tab.component, { key: tab.id });
  }

  render(): React.ReactNode {
    const { isPlaying, fanTabs, activeFanTab } = this.props;
    return (
      <IonPage id="profile-page">
        <IonContent id="profile-page" scrollY={false}>
          <BackgroundImage
            gradient="180deg,#652ddd,#2c0d5c"
            backgroundTopDark
            backgroundTop={true}
            backgroundTopOpacity={0.33}
            backgroundBottom
            backgroundBottomDark={false}
          />
          <div className={`profile-page` + (isPlaying && ' is-playing')}>
            <HeaderProfile />
            <Menu
              tabs={fanTabs}
              activeId={activeFanTab}
              onClick={this.changeFanTab}
            />
            {this.renderActiveTab()};
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { activeFanTab, fanTabs, isPlaying } = settings;
  return { activeFanTab, fanTabs, isPlaying };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(ProfilePage);
