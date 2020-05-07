import React from 'react';
import { CardGraph } from '../../../components';
import { walletMock } from './../../../constants';

interface Props {
  history: {
    push: Function;
  };
}

class DashboardAnalyticPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="content">
        {walletMock?.map(
          (data, i): React.ReactNode => (
            <CardGraph key={i}>
              <div
                className="image"
                style={{ backgroundImage: `url(${data.image})` }}
                onClick={(): void =>
                  this.props.history.push(`/dashboard/analytic/${i}`)
                }
              ></div>
            </CardGraph>
          )
        )}
      </div>
    );
  }
}

export default DashboardAnalyticPage;
