import React from 'react';
import { ButtonIcon, Header } from './../../../components';
import { ArtistInterface, Colors, ShapesSize } from '../../../interfaces';
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
      <div className={`fan-support-options`}>
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={this.props.onClick.bind(this)}
          color={Colors.transparent}
        />

        <div className={`modal-header py-2 ${this.props.background}`}>
          <div className="h0 l1">MY {this.props.artist.name}</div>
          <div className="h2 l1">FAN SUPPORT OPTIONS</div>
        </div>

        <div className="modal-content f5">
          <ul className="mt-2" style={{ minHeight: 50 }}>
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
