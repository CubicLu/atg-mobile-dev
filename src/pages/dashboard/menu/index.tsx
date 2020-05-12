import React from 'react';
import {
  IonContent,
  IonPage,
  withIonLifeCycle,
  IonRouterLink
} from '@ionic/react';
import { preventChangeTabbar, hideTabs } from '../../../utils';
import { Header, BackgroundImage } from '../../../components';
import { withRouter, RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getDashboardByArtistAPI } from './../../../actions';
import { DashboardInterface } from '../../../models';
import { routeArtistMenu } from '../../../constants/routes-menu';
interface Props
  extends DispatchProps,
    StateProps,
    RouteChildrenProps<MatchParams> {}
interface DispatchProps {
  getDashboardByArtistAPI: (username: string) => void;
}
interface MatchParams {
  artistId: string;
}
interface StateProps {
  dashboard: DashboardInterface | null;
  loading: boolean;
}
class DashboardMenuPage extends React.Component<Props> {
  UNSAFE_componentWillReceiveProps(next: Props): void {
    if (next.loading) return;
    if (this.props.loading) return;
    if (this.props.dashboard?.artist.username !== next.match!.params.artistId) {
      this.props.getDashboardByArtistAPI(next.match!.params.artistId);
    }
  }
  ionViewWillEnter(): void {
    preventChangeTabbar(true);
    hideTabs(true);
    this.props.getDashboardByArtistAPI(this.props.match!.params.artistId);
  }
  ionViewWillLeave(): void {
    hideTabs(false);
    preventChangeTabbar(false);
  }
  isActive(menu): boolean {
    return menu.id === '0';
  }

  render(): React.ReactNode {
    const { dashboard } = this.props;
    if (!dashboard) return <IonPage id="dashboard-menu-page" />;
    return (
      <IonPage id="dashboard-menu-page" className="saturate">
        <BackgroundImage
          gradient="180deg, #000000bf, #000000bf"
          gradientOverlay={true}
          backgroundImage={dashboard.artist.cover.dashboard}
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseHref="/profile"
          routerDirection="root"
        />
        <IonContent
          fullscreen={true}
          scrollEvents={false}
          forceOverscroll={false}
        >
          <div className="mt-10 mx-3 mb-5">
            <span className="h0">{dashboard.artist.name}</span>
          </div>
          {routeArtistMenu.map(
            (menu): React.ReactElement => {
              const active = this.isActive(menu) ? 'active' : '';
              return (
                <IonRouterLink
                  key={menu.id}
                  routerDirection="forward"
                  routerLink={menu.path.replace(':id', 'rival-sons')}
                >
                  <div className="flex mx-3 mt-2 mb-3">
                    <div className={`menu-circle no-padding mr-2 ${active}`} />
                    <span className={`my-auto f4 ${active}`}>{menu.label}</span>
                  </div>
                </IonRouterLink>
              );
            }
          )}
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({ dashboardAPI }: ApplicationState): StateProps => {
  const { dashboard, loading } = dashboardAPI;
  return { dashboard, loading };
};
export default withRouter(
  connect(mapStateToProps, {
    getDashboardByArtistAPI
  })(withIonLifeCycle(DashboardMenuPage))
);
