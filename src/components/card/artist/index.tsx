import React from 'react';
import { DotsThreeIcon, ButtonIcon, SupportIcon } from './../../../components';
import { updateSettingsModal } from './../../../actions';
import { ArtistInterface, ModalSlideInterface } from './../../../interfaces';
import { ApplitcationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  modal: ModalSlideInterface;
}

interface DispatchProps {
  updateSettingsModal: (condition: boolean, content: React.ReactNode) => void;
}

interface Props extends StateProps, DispatchProps {
  artist: ArtistInterface;
}

class CardArtistComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="row">
        <div className="col s12">
          <div
            className="card artist"
            style={{ backgroundImage: `url(${this.props.artist.cover})` }}
          >
            <div className="row">
              <div className="col s12 infos p-10">
                <div className="row">
                  <div className="col s12 button">
                    <ButtonIcon
                      color={'transparent'}
                      icon={<DotsThreeIcon color={'#6a6565'} />}
                      onClick={this.props.updateSettingsModal.bind(
                        this,
                        true,
                        null
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s8 name">
                    <span>{this.props.artist.name}</span>
                  </div>
                  <div className="col s4 support">
                    {this.props.artist.support && (
                      <ButtonIcon icon={<SupportIcon />} color="support" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ settings }: ApplitcationState): StateProps => {
  const { modal } = settings;
  return { modal };
};

export default connect(mapStateToProps, {
  updateSettingsModal
})(CardArtistComponent);
