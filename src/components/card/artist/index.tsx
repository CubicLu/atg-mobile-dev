import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  DotsThreeIcon,
  ButtonIcon,
  MenuFanSupportOptions,
  ButtonSupport
} from './../../../components';
import { updateArtistProperty, updateSettingsModal } from './../../../actions';
import { ArtistInterface, Colors } from './../../../interfaces';
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
    const { artist, updateSettingsModal, history } = this.props;
    if (!artist) return <div />;
    const { cover, username, support, name } = artist;

    return (
      <div className="row">
        <div className="col s12">
          <div
            className="card artist"
            style={{ backgroundImage: `url(${cover.main})` }}
          >
            <div className="row">
              <div
                className="card-area"
                onClick={(): void => {
                  history.push(`/home/artist/${username}`);
                }}
              ></div>
              <div className="col s12 infos p-10">
                <div className="row">
                  <div className="col s12 button">
                    <ButtonIcon
                      color={Colors.transparent}
                      icon={<DotsThreeIcon color={'#6a6565'} />}
                      onClick={updateSettingsModal.bind(
                        this,
                        true,
                        React.createElement(MenuFanSupportOptions, {
                          artist: artist,
                          onClick: updateSettingsModal.bind(this, false, null),
                          background: 'background-tertiary-opacity95'
                        }),
                        'background-tertiary-opacity95'
                      )}
                    />
                  </div>
                </div>
                <div
                  className="row"
                  onClick={(): void => {
                    history.push(`/home/artist/${username}`);
                  }}
                >
                  <div className="col s8 align-items-end">
                    <div className="name">
                      <span>{name}</span>
                    </div>
                  </div>
                  <div className="col s4 support">
                    <ButtonSupport
                      buttonType={'icon'}
                      supported={support}
                      onClick={(): void => {
                        history.push(`/home/artist/${username}/support`);
                      }}
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
