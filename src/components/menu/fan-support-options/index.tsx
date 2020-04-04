import React from 'react';
import { ButtonIcon, Header } from './../../../components';
import { ArtistInterface, Colors, ShapesSize } from '../../../interfaces';
import { updateSettingsModal } from './../../../actions';
import {
  SupportIcon,
  StarIcon,
  AddPlaylistIcon,
  NetworkIcon
} from '../../icon';
import { connect } from 'react-redux';

interface Props extends DispatchProps {
  artist: ArtistInterface;
  background?: string;
}
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}

class MenuFanSupportOptionsComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className={`fan-support-options`}>
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={(): void => this.props.updateSettingsModal(null)}
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

export default connect(null, { updateSettingsModal })(
  MenuFanSupportOptionsComponent
);
