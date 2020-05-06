import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage
} from './../../../components';
import { Colors } from '../../../types';
import { ProfileActionsType } from '../../../interfaces';

interface Props {
  onClick: Function;
  title: string;
  background?: string;
  data: ProfileActionsType[];
}

class MenuProfileList extends React.Component<Props> {
  render(): React.ReactNode {
    const { data } = this.props;
    return (
      <div className="menu-artist-list">
        <BackgroundImage
          backgroundBottom={true}
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />

        <div className={`modal-header ${this.props.background}`}>
          <span className="h2 dark baskerville l175">{this.props.title}</span>
        </div>

        <div className="modal-content">
          <ul>
            {data?.map(
              (item, i): React.ReactNode => {
                const { text, onClick } = item;
                return (
                  <li key={i} onClick={onClick}>
                    <div>
                      <div className="f5 dark">{text}</div>
                    </div>
                    <ButtonIcon
                      icon={<ArrowRightIcon color={'#000'} />}
                      color={Colors.transparent}
                    />
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuProfileList;
