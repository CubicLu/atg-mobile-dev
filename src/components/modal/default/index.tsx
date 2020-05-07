import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage
} from './../../../components';
import { Colors, GenericModalInterface } from '../../../interfaces';
import { IonRouterLink } from '@ionic/react';

interface Props {
  onClick: Function;
  title: string;
  subtitle?: string;
  data: GenericModalInterface[];
  content?: React.ReactNode;
  overrideClick?: boolean;
}
export default class DefaultModalComponent extends React.Component<Props> {
  handleClick(data): void {
    if (data.url && !this.props.overrideClick) return;
    this.props.onClick(data);
  }
  render(): React.ReactNode {
    const { title, subtitle } = this.props;
    return (
      <div className="menu-generic-list">
        <BackgroundImage
          backgroundBottom={true}
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />

        <div className={'modal-header background-white-base'}>
          <span className="h3 dark baskerville text-28 l15">{title}</span>
          {subtitle && (
            <div className="mb-05">
              <span className="f5 dark sub l1">{subtitle}</span>
            </div>
          )}
        </div>

        <div className="modal-content">
          {this.props.content}
          <ul>
            {this.props.data?.map(
              (data, i): React.ReactNode => (
                <IonRouterLink
                  key={i}
                  routerLink={data.url}
                  routerDirection="root"
                >
                  <li
                    key={i}
                    className="f6 dark"
                    onClick={(): void => this.handleClick(data)}
                  >
                    {data.name}
                    <ButtonIcon
                      icon={<ArrowRightIcon color={'#000'} />}
                      color={Colors.transparent}
                    />
                  </li>
                </IonRouterLink>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
}
