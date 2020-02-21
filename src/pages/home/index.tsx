import React from 'react';
import { connect } from 'react-redux';
import { Tab, Player } from './../../components';
import {} from './../../actions';
import { ApplitcationState } from '../../reducers';

interface StateProps {
  isPlaying: boolean;
}

interface DispatchProps {}

interface Props extends DispatchProps, StateProps {}

class HomePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        {this.props.isPlaying && <Player />}
        <Tab />
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: ApplitcationState): StateProps => {
  const { isPlaying } = settings;
  return { isPlaying };
};

export default connect(mapStateToProps, {})(HomePage);
