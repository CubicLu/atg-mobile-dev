import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { ButtonIcon, BackIcon } from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class HeaderComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="header default">
        <div className="row content">
          <div className="col s2 h-100 back-col">
            <ButtonIcon icon={<BackIcon />} />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderComponent);
