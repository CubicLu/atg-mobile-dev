import React from 'react';
import { CardGraph } from '../../../components';
import { walletMock } from './../../../constants';

interface Props {
  history: {
    push: Function
  };
}

class DashboardWalletPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="content">
        {walletMock?.map(
          (data, i): React.ReactNode => (
            <CardGraph key={i}>
              <div
                className="image"
                style={{ backgroundImage: `url(${data.image})` }}
                onClick={() => this.props.history.push('/dashboard/analytics') }
              ></div>
            </CardGraph>
          )
        )}
      </div>
    );
  }
}

export default DashboardWalletPage;
