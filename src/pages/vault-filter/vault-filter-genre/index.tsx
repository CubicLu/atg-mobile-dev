import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  CardGenre
} from '../../../components';

interface Props {}

class VaultFilterGenrePage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  genre = [
    {
      name: 'EDM',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
      color: '#01a7d1',
      subGenres: [
        { name: 'House', selected: false },
        { name: 'Techno', selected: false },
        { name: 'Trance', selected: false },
        { name: 'UK Garage', selected: false },
        { name: 'Drum and Bass', selected: false },
        { name: 'Breakbeat', selected: false },
        { name: 'Jungle', selected: false },
        { name: 'Detroit Techno', selected: false },
        { name: 'Eurodance', selected: false },
        { name: 'Tech House', selected: false },
        { name: 'Europop', selected: false },
        { name: 'Big Beat', selected: false }
      ]
    },
    {
      name: 'Soul',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/soul%403x.png',
      color: '#000000',
      subGenres: [
        { name: 'Psychedelic Soul', selected: false },
        { name: 'Smooth Soul', selected: false },
        { name: 'Neo Soul', selected: false },
        { name: 'Latin Soul', selected: false },
        { name: 'Quiet Storm', selected: false },
        { name: 'Blue-eyed Soul', selected: false },
        { name: 'Soul', selected: false },
        { name: 'Vapor Soul', selected: false }
      ]
    },
    {
      name: 'Gospel',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/gospel%403x.png',
      color: '#00a850',
      subGenres: [
        { name: 'Contemporary Gospel', selected: false },
        { name: 'Gospel', selected: false },
        { name: 'Southern Gospel', selected: false },
        { name: 'Hymns', selected: false },
        { name: 'Spirituals', selected: false }
      ]
    },
    {
      name: 'Hip Hop',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
      color: '#01a7d1',
      subGenres: [
        { name: 'Hardcore Hip Hop', selected: false },
        { name: 'Dirty Rap', selected: false },
        { name: 'Gangsta Rap', selected: false },
        { name: 'Mafioso Rap', selected: false },
        { name: 'Horrorcore', selected: false },
        { name: 'Drill', selected: false },
        { name: 'UK Drill', selected: false }
      ]
    },
    {
      name: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
      color: '#db115f',
      subGenres: [
        { name: 'Dixieland', selected: false },
        { name: 'Swing', selected: false },
        { name: 'Bebop', selected: false },
        { name: 'Big Band', selected: false },
        { name: 'Ragtime', selected: false },
        { name: 'Gypsy Jazz', selected: false }
      ]
    },
    {
      name: 'Lounge',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
      color: '#f6852b',
      subGenres: [
        { name: 'Lounge', selected: false },
        { name: 'Crooners', selected: false },
        { name: 'Barbershop', selected: false },
        { name: 'Muzak', selected: false }
      ]
    },
    {
      name: 'Metal',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
      color: '#000000',
      subGenres: [
        { name: 'Glam Metal', selected: false },
        { name: 'Heavy Metal', selected: false },
        { name: 'Nu Metal', selected: false },
        { name: 'Latin Metal', selected: false },
        { name: 'Nintendocore', selected: false },
        { name: 'Rap Metal', selected: false },
        { name: 'Thrash Metal', selected: false },
        { name: 'Black Metal', selected: false },
        { name: 'Doom Metal', selected: false },
        { name: 'Folk Metal', selected: false },
        { name: 'Funk Metal', selected: false },
        { name: 'Power Metal', selected: false }
      ]
    },
    {
      name: 'Reggae',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/reggae%403x.png',
      color: '#00a850',
      subGenres: [
        { name: 'Reggae', selected: false },
        { name: 'Dub', selected: false },
        { name: 'Ska', selected: false },
        { name: 'Rocksteady', selected: false },
        { name: 'Latin Reggae', selected: false },
        { name: 'Reggae Fusion', selected: false }
      ]
    }
  ];
  render(): React.ReactNode {
    return (
      <IonPage id="vault-filter-genre-page">
        <Header
          leftTitle="Genre"
          titleClassName="genre"
          rightCloseButton
          leftBackButton={false}
          rightCloseHref="/vault-filter"
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
          id="vault-filter-genre-page"
        >
          <div className="vault-filter-genre-page">
            <BackgroundImage
              gradient={'180deg,#1F0739,#1F0739'}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              backgroundTopDark
              backgroundTopOpacity={0.7}
            />
            <div className={'content-container'}>
              <div className={'row'}>
                {this.genre.map(
                  (data, i): React.ReactNode => {
                    return (
                      <CardGenre
                        name={data.name}
                        image={data.image}
                        shadowColor={data.color}
                        key={i}
                        subGenres={data.subGenres}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default VaultFilterGenrePage;
