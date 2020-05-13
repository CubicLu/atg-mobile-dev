import React from 'react';
import { Button, ListItem } from './../../../components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonList, IonContent } from '@ionic/react';
import { Colors } from '../../../types';

interface Props extends RouteComponentProps {
  isFriend: boolean;
}
class ProfileVaultPage extends React.Component<Props> {
  public static defaultProps = {
    isFriend: false
  };

  handleArtistClick = (): void => {
    this.props.history.push('/artist/pharrell-williams');
  };

  render(): React.ReactNode {
    const { history, isFriend } = this.props;
    return (
      <IonContent>
        <div className="profile-vault-page">
          <Button
            color={Colors.transparentGray}
            className={'row mt-2 mb-2'}
            label={'Filter'}
            onClick={(): void => history.push('/vault-filter')}
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
                    sliding={data.artist.support}
                    bottomBorder={true}
                    optionRemove={!isFriend}
                    hasAvatar={true}
                    avatarSize={48}
                    avatarImage={data.artist.cover.background}
                    avatarBadge={i % 3 === 0 && isFriend}
                    badgeColor={Colors.red}
                    optionAddPlaylist={true}
                    songName={data.song}
                    artistName={data.artist.name}
                    expandArrow={data.artist.support}
                    artist={data.artist}
                    supported={data.artist.support}
                    supportButtonIcon={true}
                    songAction={this.handleArtistClick}
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

export default withRouter(ProfileVaultPage);
