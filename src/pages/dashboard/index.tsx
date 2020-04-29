import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../reducers';
import {
  BackgroundImage,
  Header,
  LoaderFullscreen,
  Menu
} from '../../components';
import {
  getDashboardByArtistAPI,
  updateSettingsProperty
} from './../../actions';
import { DashboardInterface, MenuInterface } from '../../interfaces';

interface StateProps {
  loading: boolean;
  dashboard: DashboardInterface | null;
  activeDashboardTab: string;
  dashboardTabs: MenuInterface[];
}

interface DispatchProps {
  getDashboardByArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: string) => void;
}
interface Props extends RouteComponentProps, DispatchProps, StateProps {}

class DashboardPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getDashboardByArtistAPI('rival-sons');
  }

  changeDashboardTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeDashboardTab) return;
    this.props.updateSettingsProperty('activeDashboardTab', event.id);
  };

  renderActiveTab = (): React.ReactNode => {
    const { dashboardTabs, activeDashboardTab } = this.props;

    const tab = dashboardTabs.find(
      (x): boolean => x.id === activeDashboardTab
    )!;
    return React.createElement(tab.component, {
      key: tab.id
    });
  };

  render(): React.ReactNode {
    const {
      loading,
      dashboard,
      dashboardTabs,
      activeDashboardTab
    } = this.props;
    if (dashboard === null) return <LoaderFullscreen loading={loading} />;
    return (
      <IonPage id="dashboard-page">
        <IonContent scrollY={false}>
          <BackgroundImage
            gradient="180deg, #101041a6, #101041a6"
            gradientOverlay={true}
            backgroundImage={dashboard.artist.cover.dashboard}
            default={dashboard.artist.cover.dashboard === undefined}
            backgroundTop={dashboard.artist.cover.dashboard === undefined}
            backgroundBottom={dashboard.artist.cover.dashboard === undefined}
          />
          <div className={'dashboard-page'}>
            <Header
              className="dashboard-page-header"
              centerContent={
                <div className="m-4">
                  <span className="title text-30 h0 l1">Dashboard</span>
                  <br />
                  <span className="text-14 f0 l1">{dashboard.artist.name}</span>
                </div>
              }
              leftBackButton={true}
              rightActionButton={true}
              rightActionOnClick={(): void =>
                this.props.history.push('dashboard/filter')
              }
            />
            <Menu
              tabs={dashboardTabs}
              activeId={activeDashboardTab}
              onClick={this.changeDashboardTab}
            />

            {this.renderActiveTab()}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  dashboardAPI,
  settings
}: ApplicationState): StateProps => {
  const { loading, dashboard } = dashboardAPI;
  const { activeDashboardTab, dashboardTabs } = settings;
  return { loading, dashboard, activeDashboardTab, dashboardTabs };
};

export default withRouter(
  connect(mapStateToProps, {
    getDashboardByArtistAPI,
    updateSettingsProperty
  })(DashboardPage)
);
