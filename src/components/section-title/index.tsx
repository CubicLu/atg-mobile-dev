import React, { CSSProperties } from 'react';
import { ArrowRightIcon } from '..';
interface Props {
  viewAll: boolean;
  title: string;
  className?: string;
  marginX?: number;
  marginY?: number;
}

export default class SectionTitleComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: false
  };
  render(): React.ReactNode {
    const customMarginX: CSSProperties = this.props.marginX ? {} : {};
    const customMarginY: CSSProperties = this.props.marginY
      ? { marginTop: this.props.marginY }
      : {};
    const style: CSSProperties = { ...customMarginX, ...customMarginY };
    const className =
      (this.props.marginY ? '' : 'section-header-margin') +
      (this.props.className || '');

    return (
      <div className={`align-baseline row ${className}`} style={style}>
        <span className="h1 p-0 letter-spacing-2 align-start">
          {this.props.title}
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
