import React from 'react';
import { connect } from 'react-redux';
import { SubGenreModal } from '../../../components';
import { updateSettingsModal } from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { SubGenreInterface } from '../../../interfaces';

interface StateProps {}
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}

interface Props extends DispatchProps {
  name: string;
  image: string;
  shadowColor?: string;
  subGenres?: SubGenreInterface[];
  key: number;
}

class CardGenreComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  render(): React.ReactNode {
    const { image, shadowColor, updateSettingsModal } = this.props;
    const toggleModal = (): any => {
      if (!this.props.subGenres) return;
      updateSettingsModal(
        React.createElement(SubGenreModal, {
          title: this.props.name,
          subGenres: this.props.subGenres,
          background: 'background-white-base'
        }),
        'background-white-base'
      );
    };
    return (
      <div
        className="card-genre-filter pb-15"
        style={{
          backgroundImage: `url(${image})`,
          boxShadow: `inset 0 -45px 30px -20px ${shadowColor}`
        }}
        onClick={toggleModal}
      />
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { modal } = settings;
  return { modal };
};

export default connect(mapStateToProps, {
  updateSettingsModal
})(CardGenreComponent);
