import React from 'react';
import { CardGraph } from '../../../components';
import { walletMock } from './../../../constants';
import { RouteComponentProps, withRouter } from 'react-router';
interface MatchParams {
  artistId: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

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
                  this.props.history.push(
                    data.route.replace(
                      ':artistId',
                      this.props.match.params.artistId
                    )
                  )
                }
              ></div>
            </CardGraph>
          )
        )}
      </div>
    );
  }
}
export default withRouter(DashboardAnalyticPage);
