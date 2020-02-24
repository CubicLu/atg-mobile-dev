import React from 'react';
import { IonList } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  CardArtist,
  _,
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage
} from './../../../components';
import {} from './../../../actions';
import { ArtistInterface } from '../../../interfaces';

interface Props extends RouteComponentProps {}

class ProfileArtistsPage extends React.Component<Props> {
  artists: ArtistInterface[] = [];
  constructor(props: Props) {
    super(props);
    this.artists = [
      {
        name: 'Pharrell Williams',
        cover: ArtistPharrellWilliamsImage,
        support: true
      },
      {
        name: 'LMFAO',
        cover: ArtistLmfaoImage,
        support: false
      },
      {
        name: 'Pharrell Williams',
        cover: ArtistPharrellWilliamsImage,
        support: false
      }
    ];
  }

  render(): React.ReactNode {
    return (
      <div className="profile-artists-page">
        <IonList className="artist-list">
          {_.map(
            this.artists,
            (data, i): React.ReactNode => {
              return <CardArtist key={i} artist={data} />;
            }
          )}
        </IonList>
      </div>
    );
  }
}

export default withRouter(ProfileArtistsPage);
