import React from 'react';
import { ButtonIcon, Header } from './../../../components';
import {} from './../../../actions';
import { ArtistInterface, ShapesSize, Colors } from '../../../interfaces';
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
  public static defaultProps = {
    onClick: (): void => {}
  };

  render(): React.ReactNode {
    return (
      <div className={`container menu fan-support-options`}>
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={this.props.onClick.bind(this)}
          color={Colors.transparent}
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
                color={Colors.support}
                type={ShapesSize.circle}
              />
            </li>
            <li>
              Decrease support
              <ButtonIcon
                icon={<StarIcon width={25} />}
                color={Colors.transparentGray}
                type={ShapesSize.circle}
              />
            </li>
            <li>
              Temporarily pause support
              <ButtonIcon
                icon={<NetworkIcon />}
                color={Colors.transparentGray}
                type={ShapesSize.circle}
              />
            </li>
            <li>
              Cancel support
              <ButtonIcon
                icon={<AddPlaylistIcon />}
                color={Colors.transparentGray}
                type={ShapesSize.circle}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuFanSupportOptionsComponent;
