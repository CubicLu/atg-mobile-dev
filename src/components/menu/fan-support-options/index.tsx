import React from 'react';
import { ButtonIcon, Header } from './../../../components';
import { ArtistInterface } from '../../../interfaces';
import {
  SupportIcon,
  StarIcon,
  AddPlaylistIcon,
  NetworkIcon
} from '../../icon';

interface Props {
  artist: ArtistInterface;
  onClick: Function;
  background?: string;
}

class MenuFanSupportOptionsComponent extends React.Component<Props> {
  public static defaultProps = { onClick: (): void => {} };

  render(): React.ReactNode {
    return (
      <div className={`container menu fan-support-options`}>
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={this.props.onClick.bind(this)}
          color={'transparent'}
        >
          <div className={`row header ${this.props.background}`}>
            <h1 className="title">MY {this.props.artist.name}</h1>
            <h2 className="subtitle">FAN SUPPORT OPTIONS</h2>
          </div>
        </Header>
        <div className={`row header ${this.props.background}`} />
        <div className="row content">
          <ul>
            <li>
              Increase support
              <ButtonIcon
                icon={<SupportIcon />}
                color={'support'}
                type={'circle'}
              />
            </li>
            <li>
              Decrease support
              <ButtonIcon
                icon={<StarIcon width={25} />}
                color={'transparent-gray'}
                type={'circle'}
              />
            </li>
            <li>
              Temporarily pause support
              <ButtonIcon
                icon={<NetworkIcon />}
                color={'transparent-gray'}
                type={'circle'}
              />
            </li>
            <li>
              Cancel support
              <ButtonIcon
                icon={<AddPlaylistIcon />}
                color={'transparent-gray'}
                type={'circle'}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuFanSupportOptionsComponent;
