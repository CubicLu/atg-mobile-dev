import React from 'react';
import { IonPage, IonContent, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  BackgroundImage,
  HeaderProfile,
  MenuProfile,
  CardArtist,
  _,
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage,
  CirclesIcon
} from './../../components';
import {} from './../../actions';
import { ArtistInterface } from '../../interfaces';

interface Props extends RouteComponentProps {}

class ProfilePage extends React.Component<Props> {
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
      <IonPage id="profile-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg, #691DE3 0%, #20043B 100%"
            top
            imageTop={<CirclesIcon opacity={0.25}/>}
            topIsSvg
            unique={true}
          >
            <div className="profile-page">
              <HeaderProfile />
              <MenuProfile />
              <IonList className="artist-list">
                {_.map(
                  this.artists,
                  (data, i): React.ReactNode => {
                    return <CardArtist key={i} artist={data} />;
                  }
                )}
              </IonList>
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(ProfilePage);
