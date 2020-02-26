import React from 'react';
import { connect } from 'react-redux';
import { Tab, Player, ModalSlide } from './../../components';
import {} from './../../actions';
import { ApplitcationState } from '../../reducers';
import { ModalSlideInterface } from '../../interfaces';
import { setHeight } from '../../utils';

interface StateProps {
  isPlaying: boolean;
  modal: ModalSlideInterface;
}

interface DispatchProps {}

interface Props extends DispatchProps, StateProps {}

class HomePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        {this.props.isPlaying && <Player />}
        <Tab />
        <ModalSlide
          visible={this.props.modal.visible}
          height={setHeight(40)}
          classname={this.props.modal.classname}
        >
          {this.props.modal.content}
        </ModalSlide>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: ApplitcationState): StateProps => {
  const { isPlaying, modal } = settings;
  return { isPlaying, modal };
};

export default connect(mapStateToProps, {})(HomePage);
