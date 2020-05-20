import React from 'react';
import {
  ButtonSupportIcon,
  ContentLoader,
  ButtonIcon
} from './../../../components';
import { ArtistInterface } from '../../../models';
import { IonImg, IonRouterLink } from '@ionic/react';
import SupportStarIcon from '../../icon/support-star';
import { CloseIcon } from '../../icon';
import { Colors } from '../../../types';
import { store } from '../../../store';
import { updateActionSheet } from '../../../actions';

interface Props {
  artist: ArtistInterface;
  key: number;
}

interface State {
  artistIsReady: boolean;
}
export default class CardArtistComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      artistIsReady: false
    };
  }

  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  confirmDelete(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Remove this Artist?',
        confirmButtons: true
      })
    );
  }
  render(): React.ReactNode {
    const { artist } = this.props;
    if (!artist) return <div />;
    const { cover, support, name } = artist;
    return (
      <div className="my-3">
        <IonImg
          onIonImgDidLoad={(): void => {
            this.setState({
              artistIsReady: true
            });
          }}
          src={cover.main}
          style={{ width: 0, height: 0, visibility: 'hidden' }}
        />
        <ContentLoader
          speed={2}
          viewBox="0 0 400 140"
          baseUrl={window.location.pathname}
          backgroundColor="rgb(255,255,255)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.05}
          foregroundOpacity={0.15}
          style={
            this.state.artistIsReady
              ? { visibility: 'hidden', display: 'none' }
              : { visibility: 'visible' }
          }
        >
          <rect x="20" y="0" rx="8" ry="8" width="360" height="140" />
        </ContentLoader>
        <div
          className="card-artist mx-2 pb-15"
          style={
            this.state.artistIsReady
              ? { visibility: 'visible', backgroundImage: `url(${cover.main})` }
              : { visibility: 'hidden' }
          }
        >
          <div className="flex-align-items-end h-100 px-2">
            <div className="align-start">
              {support && (
                <React.Fragment>
                  <div className="star">
                    <SupportStarIcon />
                  </div>
                  <div
                    className="close"
                    onClick={(): void => this.confirmDelete()}
                  >
                    <ButtonIcon color={Colors.red} icon={<CloseIcon />} />
                  </div>
                </React.Fragment>
              )}
              <div
                onClick={(): void => this.linkRef.current!.click()}
                className="h3 text-28 artist-card-name l12"
              >
                {name}
              </div>
            </div>
            <div className="align-end mb-05">
              <ButtonSupportIcon artist={artist} supported={support} />
            </div>
          </div>
          <IonRouterLink
            ref={this.linkRef}
            routerLink={`/artist/${artist?.username}`}
            routerDirection="forward"
          />
        </div>
      </div>
    );
  }
}
