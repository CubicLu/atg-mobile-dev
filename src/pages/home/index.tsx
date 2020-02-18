import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tab } from './../../components';
import {} from './../../actions';
import { ApplitcationState } from './../../reducers';

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

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(HomePage));
