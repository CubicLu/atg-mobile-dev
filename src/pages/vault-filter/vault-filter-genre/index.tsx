import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  CardGenre,
  InputCheckbox
} from '../../../components';

interface Props extends RouteComponentProps {}

class VaultFilterGenrePage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  genre = [
    {
      name: 'EDM',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
      color: '#01a7d1',
      subGenres: [
        { name: 'House', selected: true },
        { name: 'Techno', selected: true },
        { name: 'Trance', selected: true },
        { name: 'UK Garage', selected: true },
        { name: 'Drum and Bass', selected: false },
        { name: 'Breakbeat', selected: false },
        { name: 'Jungle', selected: true },
        { name: 'Detroit Techno', selected: true },
        { name: 'Eurodance', selected: true },
        { name: 'Tech House', selected: true },
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
        { name: 'Psychedelic Soul', selected: true },
        { name: 'Smooth Soul', selected: true },
        { name: 'Neo Soul', selected: true },
        { name: 'Latin Soul', selected: true },
        { name: 'Quiet Storm', selected: false },
        { name: 'Blue-eyed Soul', selected: false },
        { name: 'Soul', selected: true },
        { name: 'Vapor Soul', selected: true }
      ]
    },
    {
      name: 'Gospel',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/gospel%403x.png',
      color: '#00a850',
      subGenres: [
        { name: 'Contemporary Gospel', selected: true },
        { name: 'Gospel', selected: true },
        { name: 'Southern Gospel', selected: true },
        { name: 'Hymns', selected: true },
        { name: 'Spirituals', selected: false }
      ]
    },
    {
      name: 'Hip Hop',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
      color: '#01a7d1',
      subGenres: [
        { name: 'Hardcore Hip Hop', selected: true },
        { name: 'Dirty Rap', selected: true },
        { name: 'Gangsta Rap', selected: true },
        { name: 'Mafioso Rap', selected: true },
        { name: 'Horrorcore', selected: false },
        { name: 'Drill', selected: false },
        { name: 'UK Drill', selected: true }
      ]
    },
    {
      name: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
      color: '#db115f',
      subGenres: [
        { name: 'Dixieland', selected: true },
        { name: 'Swing', selected: true },
        { name: 'Bebop', selected: true },
        { name: 'Big Band', selected: true },
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
        { name: 'Lounge', selected: true },
        { name: 'Crooners', selected: true },
        { name: 'Barbershop', selected: true },
        { name: 'Muzak', selected: true }
      ]
    },
    {
      name: 'Metal',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
      color: '#000000',
      subGenres: [
        { name: 'Glam Metal', selected: true },
        { name: 'Heavy Metal', selected: true },
        { name: 'Nu Metal', selected: true },
        { name: 'Latin Metal', selected: true },
        { name: 'Nintendocore', selected: true },
        { name: 'Rap Metal', selected: true },
        { name: 'Thrash Metal', selected: true },
        { name: 'Black Metal', selected: true },
        { name: 'Doom Metal', selected: true },
        { name: 'Folk Metal', selected: true },
        { name: 'Funk Metal', selected: true },
        { name: 'Power Metal', selected: true }
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
          rightCloseOnClick={(): void =>
            this.props.history.push('/vault-filter')
          }
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
                      <div className={'col s6'} key={i}>
                        <CardGenre
                          name={data.name}
                          image={data.image}
                          shadowColor={data.color}
                          key={i}
                          subGenres={data.subGenres}
                        />
                        <div className={'flex my-2'}>
                          <span className={'card-label'}>{data.name}</span>
                          <InputCheckbox
                            action={(): void => console.log(data.name)}
                          />
                        </div>
                      </div>
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

export default withRouter(VaultFilterGenrePage);
