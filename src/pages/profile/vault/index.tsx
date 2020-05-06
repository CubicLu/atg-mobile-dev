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
  render(): React.ReactNode {
    const { history, isFriend } = this.props;
    const clickArtist = (): void => history.push('/artist/pharrell-williams');
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
                    background: '',
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
                    background: '',
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
                    background: '',
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
                    background: '',
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
                    background: '',
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
                    background: '',
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
                    background: '',
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
                    background: '',
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
                    avatarBadge={i % 3 === 0 && isFriend}
                    badgeColor={Colors.red}
                    optionAddPlaylist={true}
                    songName={data.song}
                    artistName={data.artist.name}
                    expandArrow={data.artist.support}
                    artist={data.artist}
                    supported={data.artist.support}
                    supportButtonIcon={true}
                    songAction={clickArtist}
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
