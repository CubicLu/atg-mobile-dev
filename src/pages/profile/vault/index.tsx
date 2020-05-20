import React from 'react';
import { Button, ListItem } from './../../../components';
import { IonList, IonContent } from '@ionic/react';
import { Colors, ShapesSize } from '../../../types';

interface Props {
  canRemove?: boolean;
}
export default class ProfileVaultPage extends React.Component<Props> {
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
                      'https://e-cdns-images.dzcdn.net/images/cover/0d5408c64d06cd7abda744bdd5d3168d/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    gateway: '',
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
                    gateway: '',
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
                    gateway: '',
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
                      'https://e-cdns-images.dzcdn.net/images/cover/7712f6129ff723645f8a46d7e5f2b3cf/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    gateway: '',
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
                    gateway: '',
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
                    gateway: '',
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
                    gateway: '',
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
                      'https://e-cdns-images.dzcdn.net/images/cover/fd3f599db05db84cf1392021daaf3a61/264x264-000000-80-0-0.jpg',
                    main: '',
                    event: '',
                    gateway: '',
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
                    optionRemove={this.props.canRemove}
                    hasAvatar={true}
                    avatarSize={48}
                    avatarImage={data.artist.cover.background}
                    avatarBadge={i % 3 === 0}
                    badgeColor={Colors.red}
                    optionAddPlaylist={true}
                    optionShare={true}
                    songName={data.song}
                    artistName={data.artist.name}
                    artist={data.artist}
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
