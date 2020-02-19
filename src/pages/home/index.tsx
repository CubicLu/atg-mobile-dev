import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tab } from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class HomePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <Tab />
      </div>
    );
  }
}

export default withRouter(HomePage);
