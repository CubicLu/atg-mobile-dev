import React from 'react';
import {
  ButtonSupportIcon,
  ContentLoader,
  ButtonIcon
} from './../../../components';
import { ArtistInterface } from '../../../models';
import { IonRouterLink } from '@ionic/react';
import SupportStarIcon from '../../icon/support-star';
import { CloseIcon } from '../../icon';
import { Colors } from '../../../types';
import { store } from '../../../store';
import { updateActionSheet } from '../../../actions';

interface Props {
  artist: ArtistInterface;
  key: number;
  canRemove?: boolean;
}

interface State {
  isReady: boolean;
}
export default class CardArtistComponent extends React.Component<Props, State> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  private _unmounted: boolean = false;
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }
  componentWillUnmount(): void {
    this._unmounted = true;
  }
  componentDidMount(): void {
    setTimeout((): void => this.setLoaded(), 2000);
  }
  confirmDelete(): void {
    store.dispatch(
      updateActionSheet({
        cannotDismiss: true,
        title: 'Remove this Artist?',
        confirmButtons: true
      })
    );
  }
  render(): React.ReactNode {
    const { artist } = this.props;
    const { cover, support, name } = artist;
    return (
      <div className="my-3" style={{ height: 140, maxHeight: 140 }}>
        <img
          alt=""
          src={cover.main}
          decoding="async"
          style={{
            width: 1,
            height: 1,
            visibility: 'hidden',
            position: 'absolute'
          }}
          onLoad={(): void => this.setLoaded()}
          onError={(): void => this.setLoaded()}
        />
        {this.renderSkeleton()}
        <div
          className="card-artist mx-2 pb-15"
          style={
            this.state.isReady
              ? { visibility: 'visible', backgroundImage: `url(${cover.main})` }
              : { visibility: 'hidden' }
          }
        >
          <div className="flex-align-items-end h-100 px-2">
            <div className="align-start">
              {support && (
                <div className="star">
                  <SupportStarIcon />
                </div>
              )}
              {this.props.canRemove && !support && (
                <div className="close" onClick={this.confirmDelete}>
                  <ButtonIcon color={Colors.red} icon={<CloseIcon />} />
                </div>
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
  renderSkeleton(): React.ReactNode {
    if (this.state.isReady) return null;
    return (
      <ContentLoader
        speed={2}
        viewBox="0 0 400 140"
        baseUrl={window.location.pathname}
        backgroundColor="rgb(255,255,255)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.05}
        foregroundOpacity={0.15}
        style={
          this.state.isReady
            ? { visibility: 'hidden', display: 'none', position: 'absolute' }
            : { visibility: 'visible', position: 'absolute' }
        }
      >
        <rect x="20" y="0" rx="8" ry="8" width="360" height="140" />
      </ContentLoader>
    );
  }
  setLoaded(): void {
    !this.state.isReady && !this._unmounted && this.setState({ isReady: true });
  }
}
