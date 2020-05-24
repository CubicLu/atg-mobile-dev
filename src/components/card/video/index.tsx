import React from 'react';
import { ShapesSize, Colors, Sizes } from '../../../types';
import { ButtonIcon, DotsThreeIcon, ImageSkeleton } from '../..';
interface Props {
  image: string | undefined;
  width: number;
  height: number;
  showFooter?: boolean;
  type?: ShapesSize;
  video: string | undefined;
  title?: string;
  time: number | string;
  name?: string;
  routerLink?: string;
  size?: Sizes;
}

export default class CardVideoComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { type, image, time, title, size } = this.props;
    return (
      <div className="row card-out-content">
        <div
          className={`video-card-container video ${type} ${size} mb-1`}
          data-time={time}
          style={{ width: this.props.width, height: this.props.height }}
        >
          <ImageSkeleton
            routerLink={this.props.routerLink}
            className="vertical-container"
            src={image!}
            width={this.props.width}
            height={this.props.height}
          />
        </div>

        {title && <span className="f4 my-1">{title}</span>}

        {this.props.showFooter && (
          <div className={'f6 l11 flex-align-items-center'}>
            <span className="align-start">{this.props.name}</span>
            <span className="align-end">
              <ButtonIcon icon={<DotsThreeIcon />} color={Colors.transparent} />
            </span>
          </div>
        )}
      </div>
    );
  }
}
