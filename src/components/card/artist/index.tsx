import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DotsThreeIcon, ButtonIcon, SupportIcon } from './../../../components';
import { updateArtistProperty } from './../../../actions';
import { ArtistInterface } from './../../../interfaces';
import { connect } from 'react-redux';

interface StateProps {}

interface DispatchProps {
  updateArtistProperty: (property: string, value: any) => void;
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
                    <DotsThreeIcon color={'#6a6565'} />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col s8 name"
                    onClick={(): void => {
                      this.props.updateArtistProperty(
                        'currentArtist',
                        this.props.artist
                      );
                      this.props.history.push(
                        `/home/artist/${this.props.artist.username}`
                      );
                    }}
                  >
                    {this.props.artist.name}
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

const mapStateToProps = (): StateProps => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, { updateArtistProperty })(CardArtistComponent)
);
