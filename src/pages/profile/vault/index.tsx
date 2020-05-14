import React from 'react';
import { Button, ListItem } from './../../../components';
import { IonList, IonContent } from '@ionic/react';
import { Colors, ShapesSize } from '../../../types';

export default class ProfileVaultPage extends React.Component<{}> {
  render(): React.ReactNode {
    return (
      <IonContent>
        <div className="profile-vault-page">
          <Button
            color={Colors.transparentGray}
            type={ShapesSize.filter}
            className={'row mt-2 mb-2'}
            label="Filter"
            routerLink="/vault-filter"
          />
          <IonList lines="none">
            {[
              {
                song: 'Blinding Lights',
                artist: {
                  name: 'The Weeknd',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/1278198def9c07d5c284250ba82072ad/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    support: false,
                    deepDive: ''
                  },
                  username: 'pharrell-williams'
                }
              },
              {
                song: 'The Box',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/15cad877f93e8fda50c6cb347e1e85a5/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Roddy Ricch',
                  support: true
                }
              },
              {
                song: 'Don´t Start Now',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/423ad64a66ebc7b179a27ca68ca45b40/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Dua Lipa',
                  support: true
                }
              },
              {
                song: 'Circles',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/8a631869c0bbf6b8288ceabb598670b0/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Post Malone',
                  support: true
                }
              },
              {
                song: 'Life is Good',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/ecfa926cd9d5369e98bbbc4eefd57a6b/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Future ft. Drake',
                  support: false
                }
              },
              {
                song: 'Adore You',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/379613019df276565895074c85ec9efa/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Harry Styles',
                  support: true
                }
              },
              {
                song: 'Say So',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/64377279e24c6193fab373abf635a6dd/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Doja Cat',
                  support: false
                }
              },
              {
                song: 'Intentions',
                artist: {
                  username: 'pharrell-williams',
                  cover: {
                    background:
                      'https://e-cdns-images.dzcdn.net/images/cover/90fab088c4d091618e7386f688803673/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    biography: '',
                    deepDive: ''
                  },
                  name: 'Justin Bieber',
                  support: true
                }
              }
            ].map(
              (data, i): React.ReactNode => {
                return (
                  <ListItem
                    key={i}
                    node={i}
                    sliding={true}
                    expandArrow={true}
                    bottomBorder={true}
                    optionRemove={true}
                    hasAvatar={true}
                    avatarSize={48}
                    avatarImage={data.artist.cover.background}
                    avatarBadge={i % 3 === 0}
                    badgeColor={Colors.red}
                    optionAddPlaylist={true}
                    optionShare={true}
                    songName={data.song}
                    artistName={data.artist.name}
                    artist={null}
                    supported={data.artist.support}
                    supportButtonIcon={!data.artist.support}
                  />
                );
              }
            )}
          </IonList>
        </div>
      </IonContent>
    );
  }
}
