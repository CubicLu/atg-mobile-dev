import React from 'react';
import { Button, ListItem } from './../../../components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonList, IonContent } from '@ionic/react';
import { Colors } from '../../../interfaces';

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
    const clickSupport = (): void =>
      history.push('/artist/pharrell-williams/support');
    return (
      <IonContent>
        <div className="profile-vault-page">
          <Button
            color={Colors.transparentGray}
            className={'row mt-2'}
            label={'Filter'}
            onClick={(): void => history.push('/vault-filter')}
          />
          <IonList lines="none">
            {[
              { song: 'Blinding Lights', artist: 'The Weeknd', support: true },
              { song: 'The Box', artist: 'Roddy Ricch' },
              { song: 'DonÂ´t Start Now', artist: 'Dua Lipa', support: true },
              { song: 'Circles', artist: 'Post Malone', support: true },
              { song: 'Life is Good', artist: 'Future ft. Drake' },
              { song: 'Adore You', artist: 'Harry Styles', support: true },
              { song: 'Say So', artist: 'Doja Cat' },
              { song: 'Intentions', artist: 'Justin Bieber', support: true }
            ].map(
              (data, i): React.ReactNode => {
                return (
                  <ListItem
                    key={i}
                    node={i}
                    sliding={!data.support}
                    bottomBorder={true}
                    optionRemove={!isFriend}
                    hasAvatar={true}
                    avatarSize={48}
                    avatarBadge={i % 3 === 0 && isFriend}
                    badgeColor={Colors.red}
                    optionAddPlaylist={true}
                    songName={data.song}
                    artistName={data.artist}
                    expandArrow={!data.support}
                    supported={!data.support}
                    supportButtonIcon={true}
                    songAction={clickArtist}
                    expandAction={data.support ? clickSupport : undefined}
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
