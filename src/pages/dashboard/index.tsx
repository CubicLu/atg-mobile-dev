import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../reducers';
import { BackgroundImage, Header, Menu } from '../../components';
import {
  getDashboardByArtistAPI,
  updateSettingsProperty
} from './../../actions';
import { DashboardInterface, MenuInterface } from '../../interfaces';

interface StateProps {
  dashboard: DashboardInterface | null;
  activeDashboardTab: string;
  dashboardTabs: MenuInterface[];
}
interface MatchParams {
  artistId: string;
}
interface DispatchProps {
  getDashboardByArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: string) => void;
}
interface Props
  extends RouteComponentProps<MatchParams>,
    DispatchProps,
    StateProps {}

class DashboardPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getDashboardByArtistAPI('rival-sons');
  }

  changeDashboardTab = (event: MenuInterface): void => {
    const { history, activeDashboardTab } = this.props;
    if (event.id === activeDashboardTab) return;
    if (event.route && event.isPage === true) {
      return history.push(
        event.route.replace(':artistId', this.props.match.params.artistId)
      );
    }
    this.props.updateSettingsProperty('activeDashboardTab', event.id);
    if (event.onClick) {
      return event.onClick();
    }
  };

  renderActiveTab = (): React.ReactNode => {
    const { dashboardTabs, activeDashboardTab } = this.props;

    const tab = dashboardTabs.find(
      (x): boolean => x.id === activeDashboardTab
    )!;

    return (
      !tab.isPage &&
      React.createElement(tab.component, {
        key: tab.id
      })
    );
  };

  render(): React.ReactNode {
    const { dashboard, dashboardTabs, activeDashboardTab } = this.props;
    if (!dashboard) return <IonPage id="dashboard-page" />;
    return (
      <IonPage id="dashboard-page" className={'dashboard-page'}>
        <BackgroundImage
          gradient="180deg, #101041a6, #101041a6"
          gradientOverlay={true}
          backgroundImage={dashboard.artist.cover.dashboard}
          default={dashboard.artist.cover.dashboard === undefined}
          backgroundTop={dashboard.artist.cover.dashboard === undefined}
          backgroundBottom={dashboard.artist.cover.dashboard === undefined}
        />
        <Header
          leftBackHref="/profile"
          routerDirection="root"
          className="dashboard-page-header"
          centerContent={
            <div>
              <span className="title text-30 h0 l1">Dashboard</span>
              <br />
              <span className="text-14 f0 l1">{dashboard.artist.name}</span>
            </div>
          }
          leftBackButton={true}
          rightActionButton={true}
          rightActionHref="/dashboard/filter"
        />
        <Menu
          tabs={dashboardTabs}
          activeId={activeDashboardTab}
          onClick={this.changeDashboardTab}
        />

        <IonContent scrollY={true}>{this.renderActiveTab()}</IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  dashboardAPI,
  settings
}: ApplicationState): StateProps => {
  const { dashboard } = dashboardAPI;
  const { activeDashboardTab, dashboardTabs } = settings;
  return { dashboard, activeDashboardTab, dashboardTabs };
};

export default withRouter(
  connect(mapStateToProps, {
    getDashboardByArtistAPI,
    updateSettingsProperty
  })(DashboardPage)
);
