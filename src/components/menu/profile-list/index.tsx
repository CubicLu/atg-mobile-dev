import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage,
  Header
} from './../../../components';
import { Colors, ProfileActionsType } from '../../../interfaces';

interface Props {
  onClick: Function;
  title: string;
  background?: string;
  data: ProfileActionsType[];
}

class MenuProfileList extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {}
  };

  render(): React.ReactNode {
    const { data } = this.props;
    return (
      <div className="menu-artist-list">
        <BackgroundImage
          backgroundBottom={true}
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={(): void => this.props.onClick()}
          color={Colors.transparent}
        />

        <div className={`modal-header ${this.props.background}`}>
          <span className="h3 dark baskerville text-28">
            {this.props.title}
          </span>
        </div>

        <div className="modal-content">
          <ul>
            {data?.map(
              (item, i): React.ReactNode => {
                const { text, onClick } = item;
                return (
                  <li key={i} onClick={onClick}>
                    <div>
                      <div className="f4 dark">{text}</div>
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
