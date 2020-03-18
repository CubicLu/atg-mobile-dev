import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  DotsThreeIcon,
  ButtonIcon,
  MenuFanSupportOptions,
  ButtonSupport
} from './../../../components';
import { updateArtistProperty, updateSettingsModal } from './../../../actions';
import { ArtistInterface } from './../../../interfaces';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';

interface StateProps {}

interface DispatchProps {
  updateArtistProperty: (property: string, value: any) => void;
  updateSettingsModal: (
    visible: boolean,
    content: React.ReactNode,
    className?: string
  ) => void;
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {
  artist: ArtistInterface;
  key: number;
}

class CardArtistComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="row">
        <div className="col s12">
          <div
            className="card artist"
            style={{ backgroundImage: `url(${this.props.artist.cover.main})` }}
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
                        React.createElement(MenuFanSupportOptions, {
                          artist: this.props.artist,
                          onClick: this.props.updateSettingsModal.bind(
                            this,
                            false,
                            null
                          ),
                          background: 'background-tertiary-opacity95'
                        }),
                        'background-tertiary-opacity95'
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col s8 align-items-end"
                    onClick={(): void => {
                      this.props.history.push(
                        `/home/artist/${this.props.artist.username}`
                      );
                    }}
                  >
                    <div className="name">
                      <span>{this.props.artist.name}</span>
                    </div>
                  </div>
                  <div className="col s4 support">
                    <ButtonSupport
                      buttonType={'icon'}
                      supported={this.props.artist.support}
                    />
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
const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { modal } = settings;
  return { modal };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsModal,
    updateArtistProperty
  })(CardArtistComponent)
);
