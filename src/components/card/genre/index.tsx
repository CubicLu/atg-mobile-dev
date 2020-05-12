import React from 'react';
import { connect } from 'react-redux';
import { InputCheckbox, SubGenreModal } from '../../../components';
import { updateSettingsModal } from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { SubGenreInterface } from '../../../models';

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
  indeterminateState: boolean = false;
  checked: boolean = false;
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();

  verifyCheckbox(): void {
    if (!this.props.subGenres) return;
    const allItems = this.props.subGenres?.length;
    let selected = 0;

    this.props.subGenres.map((item: SubGenreInterface): void => {
      if (item.selected) selected++;
    });
    if (selected > 0 && selected < allItems) {
      this.indeterminateState = true;
      this.checked = false;
    } else if (selected === allItems) {
      this.indeterminateState = false;
      this.checked = true;
    } else {
      this.indeterminateState = false;
      this.checked = false;
    }
  }

  render(): React.ReactNode {
    this.verifyCheckbox();
    const { image, shadowColor, updateSettingsModal, name } = this.props;
    const toggleModal = (): any => {
      if (!this.props.subGenres) return;
      updateSettingsModal(
        React.createElement(SubGenreModal, {
          name: this.props.name,
          subGenres: this.props.subGenres,
          background: 'background-white-base'
        }),
        'background-white-base'
      );
    };
    return (
      <div className={'col s6'} onClick={toggleModal}>
        <div
          className="card-genre-filter pb-15"
          style={{
            backgroundImage: `url(${image})`,
            boxShadow: `inset 0 -45px 30px -20px ${shadowColor}`
          }}
        />
        <div className={'flex my-2'}>
          <span className={'card-label'}>{name}</span>
          <InputCheckbox
            indeterminate={this.indeterminateState}
            checked={this.checked}
          />
        </div>
      </div>
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
