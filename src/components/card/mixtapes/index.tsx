import React from 'react';
import { ButtonIcon } from './../../../components';

import { MixtapeInterface } from '../../../interfaces';
import {
  PlayIcon,
  DotsThreeIcon,
  StarIcon,
  CloseIcon,
  AddPlaylistIcon,
  ShareIcon,
  TrashIcon
} from './../../icon';

interface Props {
  mixtape: MixtapeInterface;
  index: number;
  menu?: boolean;
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
        <div className="row">
          <div className="col s12 cover">
            <div
              className={`tape`}
              data-tapeindex={String(index).padStart(2, '0')}
            >
              {this.state.openMenu === false && (
                <div
                  className={`background ${
                    menu === true ? '' : 'without-menu'
                  }`}
                  style={{ backgroundImage: `url(${mixtape.cover})` }}
                >
                  <ButtonIcon icon={<PlayIcon />} />
                  {menu === true && (
                    <ButtonIcon
                      icon={<DotsThreeIcon />}
                      color="transparent"
                      onClick={this.setMenu.bind(this)}
                    />
                  )}
                </div>
              )}

              {this.state.openMenu === true && (
                <div
                  className="background"
                  style={{
                    backgroundImage: `linear-gradient(90deg, #e9d3a3, #dcd6a7, #d1d7ac, #c6d9b3, #bed9bb, #b7dabf, #b1dbc4, #abdbca, #a1dcd0, #96ded7, #8cdfe0, #82dfe9)`
                  }}
                >
                  <ul className="buttons">
                    <li>
                      <ButtonIcon
                        color="red"
                        icon={<TrashIcon width={15} height={15} />}
                      />
                    </li>
                    <li>
                      <ButtonIcon
                        styles={{ backgroundColor: '#919296' }}
                        onClick={this.setMenu.bind(this)}
                        icon={
                          <CloseIcon width={14} height={14} strokeWidth={2} />
                        }
                      />
                    </li>
                    <li>
                      <ButtonIcon
                        color="green"
                        icon={<ShareIcon width={20} height={20} />}
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
          </div>
        </div>
        <div className="row">
          <div className="col s12 infos">
            <span className="playlist">{mixtape.name}</span>
            <span className="quantity">{mixtape.quantity} Songs</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CardMixtapesComponent;
