import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import { _ } from './../../components';
import { updateSettingsProperty } from './../../actions';
import { ApplicationState } from '../../reducers';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';
import { TabsInterface } from '../../interfaces';

interface MatchParams {
  id: string;
}

interface StateProps {
  activeTab: string;
  tabs: TabsInterface[];
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class TabComponent extends React.Component<Props> {
  render(): React.ReactNode {
    let redirectIndex = _.findIndex(
      this.props.tabs,
      (x): any => x.redirect === true
    );
    return (
      <IonTabs
        onIonTabsWillChange={(event): void => {
          this.props.updateSettingsProperty('activeTab', event.detail.tab);
        }}
      >
        <IonRouterOutlet id="tabs-home">
          {_.map(this.props.tabs, (data, index): any => {
            return (
              <Route path={data.path} component={data.component} key={index} />
            );
          })}
          <Redirect
            strict
            from={'/home'}
            to={this.props.tabs[redirectIndex].path}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="dark">
          {_.map(this.props.tabs, (data, index): any => {
            if (data.show !== false) {
              return (
                <IonTabButton tab={data.id} href={data.path} key={index}>
                  {React.createElement(data.icon, {
                    color: this.props.activeTab === data.id ? '#00BAFF' : '#FFF'
                  })}
                </IonTabButton>
              );
            }
            return null;
          })}
        </IonTabBar>
      </IonTabs>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { activeTab, tabs } = settings;
  return { activeTab, tabs };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(TabComponent)
);
