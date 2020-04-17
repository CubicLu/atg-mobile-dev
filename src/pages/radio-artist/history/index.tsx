import React from 'react';
import { IonContent, IonPage, IonList } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  ListItem
} from '../../../components';

interface Props {}

class RadioHistoryPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  render(): React.ReactNode {
    return (
      <IonPage id="radio-history-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header leftBackButton={true} title={'Everything Reggae History'} />
        <BackgroundImage
          gradient="180deg,#261546,#0c090b"
          backgroundTopDark
          backgroundTop={true}
          backgroundTopOpacity={0.5}
          backgroundBottom
          backgroundBottomDark={false}
        />
        <IonContent>
          <div className="profile-history-page">
            <IonList lines="none">
              {this.historySongs.map(
                (data, i): React.ReactNode => {
                  return (
                    <ListItem
                      key={i}
                      node={i}
                      sliding={true}
                      bottomBorder={true}
                      optionRemove={true}
                      hasAvatar={true}
                      avatarSize={48}
                      avatarImage={data.image}
                      songName={data.song}
                      artistName={data.artist}
                      expandArrow={true}
                      supported={i % 2 === 0}
                      supportButtonIcon={true}
                    />
                  );
                }
              )}
            </IonList>
          </div>
        </IonContent>
      </IonPage>
    );
  }
  historySongs = [
    {
      song: 'When It Comes To You',
      artist: 'Sean Paul',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      song: 'King Whithout A Crown',
      artist: 'Matisyahu',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      song: 'Better Tomorrow',
      artist: 'Luciano',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      song: 'King Whithout A Crown',
      artist: 'Matisyahu',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      song: 'King Whithout A Crown',
      artist: 'Matisyahu',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    }
  ];
}

export default RadioHistoryPage;
