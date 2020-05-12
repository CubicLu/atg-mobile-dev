import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import { BackgroundImage, HeaderProfile, Menu } from './../../components';
import { ApplicationState } from '../../reducers';
import { MenuInterface } from '../../interfaces';
import { store } from '../../store';
import { updateSettingsProperty } from '../../actions';

interface StateProps {
  fanTabs: MenuInterface[];
  activeFanTab: string;
}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}
interface Props extends StateProps {}

class ProfilePage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      pending: false
    };
  }

  changeFanTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeFanTab) return;
    store.dispatch(updateSettingsProperty('activeFanTab', event.id));
  };

  renderActiveTab(tabs: MenuInterface[], activeId, isFriend): React.ReactNode {
    const Tab = tabs.find((x): boolean => x.id === activeId)!.component;
    return <Tab isFriend={isFriend} />;
  }

  render(): React.ReactNode {
    const { fanTabs, activeFanTab } = this.props;
    return (
      <IonPage id="profile-page">
        <IonContent id="profile-page" scrollY={false}>
          <BackgroundImage default={true} />
          <div className={'profile-page'}>
            <HeaderProfile />
            <Menu
              tabs={fanTabs}
              activeId={activeFanTab}
              onClick={this.changeFanTab}
            />
            {this.renderActiveTab(fanTabs, activeFanTab, true)};
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { fanTabs, activeFanTab } = settings;
  return {
    fanTabs,
    activeFanTab
  };
};

export default connect(mapStateToProps)(ProfilePage);
