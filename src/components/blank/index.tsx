import React from 'react';
import { connect } from 'react-redux';
import {} from './../../components';
import {} from './../../actions';
import { ApplitcationState } from '../../reducers';

interface Props {}

class BlankComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return <div></div>;
  }
}

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(BlankComponent);