import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import { BackgroundImage, HeaderProfile, Menu } from './../../components';
import { ApplicationState } from './../../reducers';
import { MenuInterface } from '../../interfaces';
import { updateSettingsProperty } from './../../actions';
import { withRouter, RouteComponentProps } from 'react-router';
interface MatchParams {
  id: string;
}
interface StateProps {
  fanTabs: MenuInterface[];
  activeFanTab: string;
  profileFriendTabs: MenuInterface[];
  activeProfileFriendTab: string;
}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ProfilePage extends React.Component<Props> {
  changeFanTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeFanTab) return;
    this.props.updateSettingsProperty('activeFanTab', event.id);
  };

  changeProfileFriendTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeProfileFriendTab) return;
    this.props.updateSettingsProperty('activeProfileFriendTab', event.id);
  };

  renderActiveTab(): React.ReactNode {
    const {
      fanTabs,
      activeFanTab,
      profileFriendTabs,
      activeProfileFriendTab,
      match
    } = this.props;

    if (match.params.id !== undefined) {
      const tab = profileFriendTabs.find(
        (x): boolean => x.id === activeProfileFriendTab
      )!;
      return React.createElement(tab.component, {
        key: tab.id,
        isFriend: true
      });
    } else {
      const tab = fanTabs.find((x): boolean => x.id === activeFanTab)!;
      return React.createElement(tab.component, {
        key: tab.id,
        isFriend: false
      });
    }
  }

  renderProfileFriend(): React.ReactNode {
    const { profileFriendTabs, activeProfileFriendTab } = this.props;
    return (
      <>
        <BackgroundImage
          gradient="180deg, #8202b7cc 20%, #20043bcc 50%, #20043B 100%"
          backgroundImage={
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/profile/background.png'
          }
          backgroundBottom
          gradientOverlay={true}
          backgroundBottomDark={false}
        />
        <div className={`profile-page`}>
          <HeaderProfile isFriend />
          <Menu
            tabs={profileFriendTabs}
            activeId={activeProfileFriendTab}
            onClick={this.changeProfileFriendTab}
          />
          {this.renderActiveTab()};
        </div>
      </>
    );
  }

  renderMyProfile(): React.ReactNode {
    const { fanTabs, activeFanTab } = this.props;
    return (
      <>
        <BackgroundImage
          gradient="180deg,#652ddd,#2c0d5c"
          backgroundTopDark
          backgroundTop={true}
          backgroundTopOpacity={0.33}
          backgroundBottom
          backgroundBottomDark={false}
        />
        <div className={`profile-page`}>
          <HeaderProfile />
          <Menu
            tabs={fanTabs}
            activeId={activeFanTab}
            onClick={this.changeFanTab}
          />
          {this.renderActiveTab()};
        </div>
      </>
    );
  }

  render(): React.ReactNode {
    const { match } = this.props;
    return (
      <IonPage id="profile-page">
        <IonContent id="profile-page" scrollY={false}>
          {match.params.id !== undefined
            ? this.renderProfileFriend()
            : this.renderMyProfile()}
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const {
    fanTabs,
    activeFanTab,
    activeProfileFriendTab,
    profileFriendTabs
  } = settings;
  return { fanTabs, activeFanTab, activeProfileFriendTab, profileFriendTabs };
};

export default withRouter(
  connect(mapStateToProps, { updateSettingsProperty })(ProfilePage)
);
