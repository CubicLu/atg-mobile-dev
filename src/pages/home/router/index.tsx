import React from 'react';
import { connect } from 'react-redux';
import { TabsInterface, RouteInterface } from '../../../models';
import { ApplicationState } from '../../../reducers';
import { Route, Redirect } from 'react-router-dom';
import { NotFoundPage } from '../..';
import { updateSettingsModal, updateSettingsProperty } from '../../../actions';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';
import ButtonIcon from '../../../components/button/icon';
import { ProfileIcon } from '../../../components/icon';

interface StateProps {
  tabs: TabsInterface[];
  routes: RouteInterface[];
  activeTab: string;
  notifications: number;
}
interface Props extends StateProps {
  updateSettingsProperty: (property: string, value: string) => void;
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}
class HomeRouterPage extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const {
      tabs,
      routes,
      activeTab,
      updateSettingsProperty,
      notifications,
      updateSettingsModal
    } = this.props;
    return (
      <IonTabs
        onIonTabsDidChange={(e): void => {
          updateSettingsProperty('activeTab', e.detail.tab);
          updateSettingsModal(null);
        }}
      >
        <IonRouterOutlet>
          {tabs.map((p: TabsInterface, i: number): any => (
            <Route
              key={i}
              exact
              path={p.path}
              render={(route): any => <p.component path={p.path} {...route} />}
            />
          ))}
          {routes.map((p: RouteInterface, i: number): any => (
            <Route
              key={i}
              exact
              path={p.path}
              render={(route): any => (
                <p.component path={p.path} {...route} parentTab={p.parentTab} />
              )}
            />
          ))}
          <Redirect exact path="/" to="/profile/" />
          <Route path="*" component={NotFoundPage} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="dark" selectedTab={activeTab}>
          {tabs.map((p: TabsInterface): any => (
            <IonTabButton
              selected={activeTab === p.id}
              tab={p.id}
              href={p.path}
              key={p.id}
            >
              {p.icon === ProfileIcon ? (
                <ButtonIcon
                  icon={<ProfileIcon />}
                  overlay={notifications}
                  overlayClassName={'notificationBadge'}
                />
              ) : (
                <p.icon />
              )}
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { tabs, routes, activeTab, notifications } = settings;
  return { tabs, routes, activeTab, notifications };
};
export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateSettingsModal
})(HomeRouterPage);
