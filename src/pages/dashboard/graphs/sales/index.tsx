import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { Header } from '../../../../components';
import { analyticsMock } from './../../../../constants';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  artistId: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

export default class DashboardGraphSalesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage
        id="dashboard-analytics-page"
        className="dashboard-analytics-page"
      >
        <Header
          className="dashboard-page-header"
          centerContent={
            <div>
              <span className="title text-30 h0 l1">Overall Sales</span>
              <br />
              <span className="text-14 f0 l1">Wallet</span>
            </div>
          }
          leftBackButton={false}
          rightCloseButton={true}
          rightClickGoBack={true}
        />
        <IonContent>
          <div className="graph-placeholder chart">
            <img src={analyticsMock[0].dashboardSalesPlaceholder} alt="" />
          </div>
          <div className="graph-placeholder map">
            <img
              src={analyticsMock[1].dashboardSalesCountryPlaceholder}
              alt=""
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
