import React from 'react';
import { IonContent, IonPage, withIonLifeCycle } from '@ionic/react';
import { preventChangeTabbar, hideTabs } from '../../../utils';
import { Header, BackgroundImage } from '../../../components';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getDashboardByArtistAPI } from './../../../actions';
import { DashboardInterface } from '../../../models';
import { routeArtistMenu } from '../../../constants/routes-menu';
import { RouteComponentProps } from 'react-router';
interface Props
  extends DispatchProps,
    StateProps,
    RouteComponentProps<MatchParams> {}
interface DispatchProps {
  getDashboardByArtistAPI: (username: string) => void;
}
interface MatchParams {
  artistId: string;
}
interface StateProps {
  dashboard: DashboardInterface | null;
}
class DashboardMenuPage extends React.Component<Props> {
  componentDidUpdate(next: Props): void {
    if (this.props.dashboard?.artist.username !== next.match.params.artistId) {
      this.props.getDashboardByArtistAPI(next.match.params.artistId);
    }
  }
  ionViewWillEnter(): void {
    preventChangeTabbar(true);
    hideTabs(true);
    this.props.getDashboardByArtistAPI(this.props.match.params.artistId);
  }
  ionViewWillLeave(): void {
    hideTabs(false);
    preventChangeTabbar(false);
  }
  isActive(menu): boolean {
    return menu.id === '0';
  }

  render(): React.ReactNode {
    const { dashboard, history, match } = this.props;
    return (
      <IonPage id="dashboard-menu-page" className="saturate">
        <BackgroundImage
          gradient="180deg, #000000bf, #000000bf"
          gradientOverlay={true}
          backgroundImage={dashboard?.artist.cover.dashboard}
        />
        <Header
          rightCloseHref={'/profile'}
          leftBackButton={false}
          rightCloseButton={true}
        />
        <IonContent
          fullscreen={true}
          scrollEvents={false}
          forceOverscroll={false}
        >
          <div className="mt-10 mx-3 mb-5">
            <span className="h0">{dashboard?.artist.name || ' '}</span>
          </div>
          {routeArtistMenu.map(
            (menu): React.ReactElement => {
              const active = this.isActive(menu) ? 'active' : '';
              return (
                <div
                  key={menu.id}
                  className="flex mx-3 mt-2 mb-3"
                  onClick={(): void => {
                    history.push(
                      menu.path.replace(':id', match.params.artistId)
                    );
                  }}
                >
                  <div className={`menu-circle no-padding mr-2 ${active}`} />
                  <span className={`my-auto f4 ${active}`}>{menu.label}</span>
                </div>
              );
            }
          )}
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({ dashboardAPI }: ApplicationState): StateProps => {
  const { dashboard } = dashboardAPI;
  return { dashboard };
};
export default connect(mapStateToProps, {
  getDashboardByArtistAPI
})(withIonLifeCycle(DashboardMenuPage));
