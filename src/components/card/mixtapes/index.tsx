import React from 'react';
import { ButtonIcon, ContentLoader, FavoriteIcon } from './../../../components';
import { MixtapeInterface } from '../../../models';
import { Colors } from '../../../types';
import {
  PlayIcon,
  DotsThreeIcon,
  CloseIcon,
  AddPlaylistIcon,
  ShareIcon,
  TrashIcon
} from './../../icon';
import { IonRouterLink } from '@ionic/react';
import { store } from '../../../store';
import { updateActionSheet } from '../../../actions';

interface Props {
  mixtape: MixtapeInterface;
  index: number;
  menu?: boolean;
  onClick?: () => void;
}

interface State {
  readonly openMenu: boolean;
  readonly isReady: boolean;
}

export default class CardMixtapesComponent extends React.Component<
  Props,
  State
> {
  private _unmounted: boolean = false;
  public static defaultProps = { menu: true };
  constructor(props: Props) {
    super(props);
    this.state = { openMenu: false, isReady: false };
  }

  componentWillUnmount(): void {
    this._unmounted = true;
  }
  displayContent = (): void => {
    setTimeout((): void => {
      !this._unmounted && this.setState({ isReady: true });
    }, 2000);
  };
  setMenu(): void {
    this.setState({ openMenu: !this.state.openMenu });
  }

  confirmDelete(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Remove Mixtape',
        confirmButtons: true,
        cannotDismiss: true
      })
    );
  }
  confirmShare(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Share',
        confirmButtons: false,
        shareOption: true
      })
    );
  }

  render(): React.ReactNode {
    const { index, menu, mixtape } = this.props;
    if (!mixtape) return <div />;
    if (!this.state.isReady) this.displayContent();

    return (
      <div>
        <ContentLoader
          className="mt-3"
          speed={2}
          viewBox="0 0 400 400"
          baseUrl={window.location.pathname}
          backgroundColor="rgb(255,255,255)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.05}
          foregroundOpacity={0.15}
          style={
            this.state.isReady
              ? { visibility: 'hidden', display: 'none' }
              : { visibility: 'visible' }
          }
        >
          <circle cx="190" cy="160" r="158" />
          <rect x="90" y="330" rx="3" ry="3" width="200" height="35" />
          <rect x="120" y="370" rx="3" ry="3" width="130" height="20" />
        </ContentLoader>

        <div
          className="card mixtapes"
          style={
            this.state.isReady
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }
        >
          <div
            className={'h1 tape'}
            data-tapeindex={String(index).padStart(2, '0')}
          >
            {this.state.openMenu === false && (
              <div
                className={`background ${menu === true ? '' : 'without-menu'}`}
                style={{ backgroundImage: `url(${mixtape.cover})` }}
              >
                <ButtonIcon onClick={this.props.onClick} icon={<PlayIcon />} />
                {menu === true && (
                  <ButtonIcon
                    icon={<DotsThreeIcon />}
                    color={Colors.transparent}
                    onClick={(): void => this.setMenu()}
                  />
                )}
              </div>
            )}

            {this.state.openMenu === true && (
              <div
                className="background"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #e9d3a3, #dcd6a7, #d1d7ac, #c6d9b3, #bed9bb, #b7dabf, #b1dbc4, #abdbca, #a1dcd0, #96ded7, #8cdfe0, #82dfe9)'
                }}
              >
                <ul className="buttons">
                  <li>
                    <ButtonIcon
                      color={Colors.red}
                      onClick={(): void => this.confirmDelete()}
                      icon={<TrashIcon width={15} height={15} />}
                    />
                  </li>
                  <li>
                    <ButtonIcon
                      styles={{ backgroundColor: '#919296' }}
                      onClick={(): void => this.setMenu()}
                      icon={<CloseIcon strokeWidth={2} />}
                    />
                  </li>
                  <li>
                    <ButtonIcon
                      color={Colors.green}
                      onClick={(): void => this.confirmShare()}
                      icon={<ShareIcon width={17} height={22} />}
                    />
                  </li>
                  <li>
                    <ButtonIcon
                      styles={{ backgroundColor: '#015CAC' }}
                      icon={<AddPlaylistIcon width={20} height={22} />}
                    />
                  </li>
                  <li>
                    <FavoriteIcon />
                  </li>
                </ul>
              </div>
            )}
          </div>

          <IonRouterLink
            routerDirection="forward"
            routerLink={`/track/mixtape/${mixtape.playlist?.id || 0}/0`}
          >
            <div className="flex-justify-content-center center-align">
              <div className="f4 mt-2 l15">
                {mixtape.name}
                <div className="f6 l15">{mixtape.quantity} Songs</div>
              </div>
            </div>
          </IonRouterLink>
        </div>
      </div>
    );
  }
}
