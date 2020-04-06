import React from 'react';
import { ButtonIcon } from './../../../components';
import { ArtistInterface, Colors, ShapesSize } from '../../../interfaces';
import {
  SupportIcon,
  StarIcon,
  AddPlaylistIcon,
  NetworkIcon
} from '../../icon';

interface Props {
  onClick: Function;
  artist: ArtistInterface;
  background?: string;
}
class MenuFanSupportOptionsComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="fan-support-options">
        <div className={`modal-header py-2 ${this.props.background}`}>
          <div className="h0 l1">MY {this.props.artist.name}</div>
          <div className="h2 l1">FAN SUPPORT OPTIONS</div>
        </div>

        <div className="modal-content f5">
          <ul className="mt-2" style={{ minHeight: 50 }}>
            <li>
              Increase support
              <SupportIcon width={42} height={42} />
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
