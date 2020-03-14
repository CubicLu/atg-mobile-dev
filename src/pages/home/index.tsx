import React from 'react';
import { connect } from 'react-redux';
import { Tab, Player, ModalSlide } from './../../components';
import { updateSettingsModal } from './../../actions';
import { ApplicationState } from '../../reducers';
import { ModalSlideInterface } from '../../interfaces';
import { setHeight } from '../../utils';

interface StateProps {
  modal: ModalSlideInterface;
}

interface DispatchProps {
  updateSettingsModal: (
    visible: boolean,
    content: React.ReactNode,
    className?: string
  ) => void;
}

interface Props extends DispatchProps, StateProps {}

class HomePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <Tab />
        <ModalSlide
          onClose={(): void => {
            this.props.updateSettingsModal(false, null);
          }}
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

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { modal } = settings;
  return { modal };
};

export default connect(mapStateToProps, { updateSettingsModal })(HomePage);
