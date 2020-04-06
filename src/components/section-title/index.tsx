import React from 'react';
import { ArrowRightIcon } from '..';
interface Props {
  viewAll: boolean;
  title: string;
  className?: string;
  leftClassName?: string;
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
            View All&nbsp;
            <ArrowRightIcon width={8} height={10} stroke={3} />
          </span>
        )}
      </div>
    );
  }
}
