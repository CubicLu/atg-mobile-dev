import React from 'react';
import { CardGraph } from '../../../components';
import { dashboardMock } from './../../../constants';
import { IonContent } from '@ionic/react';

interface Props {}

class DashboardAnalyticPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent>
        {dashboardMock.analytic?.map(
          (data, i): React.ReactNode => (
            <CardGraph key={i}>
              <div
                className="image"
                style={{ backgroundImage: `url(${data.image})` }}
              ></div>
            </CardGraph>
          )
        )}
      </IonContent>
    );
  }
}

export default DashboardAnalyticPage;
