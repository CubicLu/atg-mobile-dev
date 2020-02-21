import React from 'react';
import { DotsThreeIcon, ButtonIcon, SupportIcon } from './../../../components';
import {} from './../../../actions';
import { ArtistInterface } from './../../../interfaces';

interface Props {
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
                    <DotsThreeIcon color={'#6a6565'} />
                  </div>
                </div>
                <div className="row">
                  <div className="col s8 name">{this.props.artist.name}</div>
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

export default CardArtistComponent;
