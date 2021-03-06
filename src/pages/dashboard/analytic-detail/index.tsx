import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { Header } from '../../../components';
import { analyticsMock } from './../../../constants';

class DashboardAnalyticDetailPage extends React.Component<{}> {
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

export default DashboardAnalyticDetailPage;
