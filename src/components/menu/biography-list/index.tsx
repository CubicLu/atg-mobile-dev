import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage,
  LockedIcon
} from './../../../components';
import { BiographyInterface } from '../../../interfaces';
import { Colors } from '../../../types';

interface Props {
  onClick: Function;
  title: string;
  username: string;
  background?: string;
  items?: BiographyInterface[];
  name?: string;
  handlePremiumModal: (modalType: string | null) => void;
}
class BiographyListComponent extends React.Component<Props> {
  handleOnClick = (
    item: BiographyInterface,
    index: number
  ): (() => void) => (): void => {
    if (item.accessLevel && item.accessLevel > 0) {
      this.props.handlePremiumModal('premiumFeatureModal');
    } else {
      this.props.onClick(index);
    }
  };

  render(): React.ReactNode {
    return (
      <div className="menu-generic-list">
        <BackgroundImage
          backgroundBottom
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />
        <div className={`modal-header ${this.props.background}`}>
          <span className="h2 dark baskerville">{this.props.title}</span>
        </div>

        <div className="modal-content">
          <ul>
            {this.props.items &&
              this.props.items.map(
                (data, i): React.ReactNode => (
                  <li key={i} onClick={this.handleOnClick(data, i)}>
                    <div className="artist">
                      <div className="name">{data.name}</div>
                    </div>
                    {data.accessLevel && data.accessLevel > 0 ? (
                      <ButtonIcon
                        icon={<LockedIcon color={'#000'} />}
                        color={Colors.transparent}
                        styles={{ padding: '0 9px' }}
                      />
                    ) : (
                      <ButtonIcon
                        icon={<ArrowRightIcon color={'#000'} />}
                        color={Colors.transparent}
                      />
                    )}
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    );
  }
}

export default BiographyListComponent;
