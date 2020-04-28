import React from 'react';
import { ButtonIcon } from './../../../components';
import { MixtapeInterface, Colors } from '../../../interfaces';
import {
  PlayIcon,
  DotsThreeIcon,
  StarIcon,
  CloseIcon,
  AddPlaylistIcon,
  ShareIcon,
  TrashIcon
} from './../../icon';
import { IonRouterLink } from '@ionic/react';

interface Props {
  mixtape: MixtapeInterface;
  index: number;
  menu?: boolean;
  onClick?: () => void;
}

interface State {
  openMenu: any;
}

class CardMixtapesComponent extends React.Component<Props, State> {
  public static defaultProps = {
    menu: true
  };
  constructor(props: Props) {
    super(props);

    this.state = {
      openMenu: false
    };
  }

  setMenu(): void {
    this.setState({
      openMenu: !this.state.openMenu
    });
  }

  render(): React.ReactNode {
    const { index, menu, mixtape } = this.props;
    if (!mixtape) return <div />;

    return (
      <div className="card mixtapes">
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
                  <ButtonIcon
                    styles={{ backgroundColor: '#F78330' }}
                    icon={<StarIcon width={23} height={23} />}
                  />
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
    );
  }
}

export default CardMixtapesComponent;
