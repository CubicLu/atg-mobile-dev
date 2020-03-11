import React from 'react';
import { ButtonIcon, CloseIcon } from './../../../components';
import {} from './../../../actions';
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
  public static defaultProps = {
    onClick: (): void => {}
  };

  render(): React.ReactNode {
    return (
      <div className={`container menu fan-support-options`}>
        <div className={`row header ${this.props.background}`}>
          <div className="col s10">
            <h1 className="title">MY {this.props.artist.name}</h1>
            <h2 className="subtitle">FAN SUPPORT OPTIONS</h2>
          </div>
          <div className="col s2 button">
            <ButtonIcon
              styles={{ width: 30, height: 30 }}
              icon={<CloseIcon width={12} height={12} strokeWidth={2} />}
              onClick={(): any => {
                this.props.onClick();
              }}
            />
          </div>
        </div>
        <div className="row content">
          <div className="col s12">
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
      </div>
    );
  }
}

export default MenuFanSupportOptionsComponent;
