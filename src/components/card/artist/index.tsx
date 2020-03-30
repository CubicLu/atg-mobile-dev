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
      <div
        className="card-artist my-3 mx-2"
        style={{ backgroundImage: `url(${cover.main})` }}
      >
        <div className="flex-space-around h-100 px-1">
          <div className="flex-justify-content-end px-1">
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

          <div
            className="flex-space-between-bottom mx-1 mb-1 l12"
            onClick={(): void => {
              history.action = 'POP';
              history.replace(`/home/artist/${username}`);
            }}
          >
            <div className="h3 artist-name l12 align-start">
              <span>{name}</span>
            </div>
            <div className="align-end">
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
