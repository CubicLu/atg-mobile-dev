import React from 'react';
import { connect } from 'react-redux';
import { TabsInterface, LinksInterface } from '../../../interfaces';
import { ApplicationState } from '../../../reducers';
import { Route, Redirect } from 'react-router-dom';
import { NotFoundPage } from '../..';
import { updateSettingsProperty } from '../../../actions';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';

interface StateProps {
  tabs: TabsInterface[];
  links: LinksInterface[];
  activeTab: string;
}
interface Props extends StateProps {
  updateSettingsProperty: (property: string, value: string) => void;
}
class HomeRouterPage extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { tabs, links, activeTab, updateSettingsProperty } = this.props;
    return (
      <IonTabs
        onIonTabsDidChange={(e): void =>
          updateSettingsProperty('activeTab', e.detail.tab)
        }
      >
        <IonRouterOutlet>
          {tabs.map((p: TabsInterface, i: number): any => (
            <Route exact path={p.path} component={p.component} key={i} />
          ))}
          {links.map((p: LinksInterface, i: number): any => (
            <Route exact path={p.path} component={p.component} key={i} />
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
              <p.icon />
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { tabs, links, activeTab } = settings;
  return { tabs, links, activeTab };
};
export default connect(mapStateToProps, { updateSettingsProperty })(
  HomeRouterPage
);
