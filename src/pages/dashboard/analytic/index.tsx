import React from 'react';
import { CardGraph } from '../../../components';
import { dashboardMock } from './../../../constants';

interface Props {}

class DashboardAnalyticPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="content">
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
      </div>
    );
  }
}

export default DashboardAnalyticPage;
