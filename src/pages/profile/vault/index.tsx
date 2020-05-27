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
                asset: 'Hollow Bones',
                assetUrl: '/track/artist/rival-sons/0',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_rivalsons.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Rival Sons',
                  username: 'rival-sons',
                  support: true
                }
              },
              {
                asset: 'New Promo Video',
                assetUrl: '/artist/pharrell-williams/video/9',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_bono.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Bono Vox',
                  username: 'bono-vox',
                  support: false
                }
              },
              {
                asset: 'Pharrell Art',
                assetUrl: '/artist/pharrell-williams/gallery/4',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-2/cover.png',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Pharrell Williams',
                  username: 'pharrell-williams',
                  support: true
                }
              },
              {
                asset: 'GIRL',
                assetUrl: '/track/artist/pharrell-williams/2',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_pharrell.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Rival Sons',
                  username: 'rival-sons',
                  support: true
                }
              },
              {
                asset: 'Guitas & Grit',
                assetUrl: '/track/mixtape/7516727864/0',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar-playlist.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Mixtape',
                  username: '',
                  support: true
                }
              },
              {
                asset: 'Some Memories from our ...',
                assetUrl: '/community/comments/103',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_rivalsons.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Rival Sons',
                  username: 'rival-sons',
                  support: true
                }
              },
              {
                asset: 'Metalica🔥🤘 #metallica ...',
                assetUrl: '/community/comments/109',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/harold.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Harold',
                  username: 'harold',
                  support: true
                }
              },
              {
                asset: 'Freedom',
                assetUrl: '/track/artist/pharrell-williams/1',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_pharrell.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Pharrell Williams',
                  username: 'pharrell-williams',
                  support: true
                }
              },
              {
                asset: 'Happy - Official Music Video',
                assetUrl: '/artist/pharrell-williams/video/0',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_pharrell.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Pharrell Williams',
                  username: 'pharrell-williams',
                  support: true
                }
              },
              {
                asset: 'Blues & Bass',
                assetUrl: '/track/mixtape/7516744044/0',
                avatar:
                  'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues-playlist.jpg',
                artist: {
                  cover: {
                    deepDive: '',
                    background: '',
                    main: '',
                    event: '',
                    gateway: '',
                    biography: ''
                  },
                  name: 'Mixtape',
                  username: 'pharrell-williams',
                  support: true
                }
              }
            ].map(
              (file, i): React.ReactNode => {
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
                    avatarImage={file.avatar}
                    avatarBadge={i % 3 === 0}
                    badgeColor={Colors.red}
                    routeLink={file.assetUrl}
                    optionAddPlaylist={file.artist.support}
                    optionShare={file.artist.support}
                    songName={file.asset}
                    artistName={file.artist.name}
                    artist={file.artist}
                    supported={file.artist.support}
                    supportButtonIcon={!file.artist.support}
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
