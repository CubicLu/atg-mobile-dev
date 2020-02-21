import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent, IonList } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundCircleDarkGrayImage,
  HeaderProfile,
  MenuProfile,
  CardArtist,
  _,
  ArtistPharrellWilliamsImage,
  ArtistLmfaoImage
} from './../../components';
import {} from './../../actions';
import { ArtistInterface } from './../../interfaces';
import { ApplitcationState } from './../../reducers';

interface StateProps {
  isPlaying: boolean;
}

interface DispatchProps {}

interface Props extends DispatchProps, StateProps {}

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
            imageTop={BackgroundCircleDarkGrayImage}
            unique={true}
            styles={{ height: 'auto' }}
          >
            <div
              className={
                `profile-page` + (this.props.isPlaying && ' is-playing')
              }
            >
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

const mapStateToProps = ({ settings }: ApplitcationState): StateProps => {
  const { isPlaying } = settings;
  return { isPlaying };
};

export default connect(mapStateToProps, {})(ProfilePage);
