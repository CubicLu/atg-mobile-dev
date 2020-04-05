import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import { BackgroundImage, HeaderProfile, Menu } from './../../components';
import { ApplicationState } from './../../reducers';
import { MenuInterface } from '../../interfaces';
interface StateProps {
  fanTabs: MenuInterface[];
}
class ProfilePage extends React.Component<StateProps> {
  activeFanTab: string = 'artists';
  changeFanTab = (event: MenuInterface): void => {
    if (event.id === this.activeFanTab) return;
    this.activeFanTab = event.id;
    this.forceUpdate();
  };
  render(): React.ReactNode {
    const { fanTabs } = this.props;
    const activeTab = fanTabs.find((x): boolean => x.id === this.activeFanTab)!;
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
          <div className={`profile-page`}>
            <HeaderProfile />
            <Menu
              tabs={fanTabs}
              activeId={this.activeFanTab}
              onClick={this.changeFanTab}
            />
            {<activeTab.component />}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { fanTabs } = settings;
  return { fanTabs };
};

export default connect(mapStateToProps)(ProfilePage);
