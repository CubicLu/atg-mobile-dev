import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { _, Player } from './../../components';
import { updateSettingsProperty } from './../../actions';
import { ApplicationState } from '../../reducers';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';
import { TabsInterface, LinksInterface } from '../../interfaces';
import { ProfilePage } from '../../pages';

interface MatchParams {
  id: string;
}

interface StateProps {
  activeTab: string;
  tabs: TabsInterface[];
  links: LinksInterface[];
  isPlaying: boolean;
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
    console.log(this.props.links, this.props.match.params);
    return (
      <React.Fragment>
        <IonTabs
          onIonTabsDidChange={(event): void => {
            this.props.updateSettingsProperty('activeTab', event.detail.tab);
          }}
        >
          <IonRouterOutlet id="tabs-home">
            {_.map(this.props.links, (data, index): any => {
              return (
                <Route
                  exact
                  path={data.path}
                  component={data.component}
                  key={index}
                />
              );
            })}
            {_.map(this.props.tabs, (data, index): any => {
              return (
                <Route
                  path={data.path}
                  component={data.component}
                  key={index}
                />
              );
            })}
            <Route path="/home" component={ProfilePage} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="dark">
            {_.map(this.props.tabs, (data, index): any => {
              return (
                <IonTabButton tab={data.id} href={data.path} key={index}>
                  {React.createElement(data.icon, {
                    color: this.props.activeTab === data.id ? '#00BAFF' : '#FFF'
                  })}
                </IonTabButton>
              );
            })}
          </IonTabBar>
        </IonTabs>

        <Player />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { activeTab, tabs, links, isPlaying } = settings;
  return { activeTab, tabs, links, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(TabComponent)
);
