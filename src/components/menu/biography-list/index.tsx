import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage
} from './../../../components';
import { BiographyInterface, Colors } from '../../../interfaces';
import { LockedIcon } from '../../icon';

interface Props {
  onClick: Function;
  title: string;
  username: string;
  background?: string;
  items?: BiographyInterface[];
}
class BiographyListComponent extends React.Component<Props> {
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
                  <li key={i} onClick={(): number => this.props.onClick(i)}>
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
