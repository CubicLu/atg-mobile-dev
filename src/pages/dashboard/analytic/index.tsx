import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  DashboardSalesPlaceholder,
  DashboardSalesCountryPlaceholder,
  Header
} from '../../../components';
interface Props {
  history: {
    goBack: Function
  };
}

class DashboardAnalyticPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="dashboard-analytics-page" className="dashboard-analytics-page">
        <Header
          leftBackHref="/profile"
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
          rightCloseOnClick={(): void =>
            this.props.history.goBack()
          }
        />
        <IonContent>
          <div className="graph-placeholder chart">
            <img src={DashboardSalesPlaceholder} alt=""/>
          </div>
          <div className="graph-placeholder map">
            <img src={DashboardSalesCountryPlaceholder} alt=""/>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default DashboardAnalyticPage;
