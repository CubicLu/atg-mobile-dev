import React from 'react';
import { ArrowRightIcon } from '..';
import { IonRouterLink } from '@ionic/react';
interface Props {
  viewAll: boolean;
  title: string;
  className?: string;
  leftClassName?: string;
  viewAllUrl?: string;
  leftContent?: React.ReactNode;
}

export default class SectionTitleComponent extends React.Component<Props> {
  public static defaultProps = { viewAll: false };

  render(): React.ReactNode {
    const { leftClassName, className } = this.props;
    return (
      <div
        className={`flex-align-items-baseline row ${
          className ? className : ''
        }`}
      >
        <span
          className={`h1 p-0 letter-spacing-2 align-start ${
            leftClassName ? leftClassName : ''
          }`}
        >
          {this.props.title}
          {this.props.leftContent}
        </span>

        {this.props.viewAll && (
          <span className="f5 text-15 align-end">
            <IonRouterLink routerLink={this.props.viewAllUrl}>
              <span className="f5 text-15 align-end mr-05">View All</span>
              <ArrowRightIcon width={10} height={14} stroke={3} />
            </IonRouterLink>
          </span>
        )}
      </div>
    );
  }
}
