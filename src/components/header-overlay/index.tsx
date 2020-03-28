import React from 'react';
import { CreateAnimation } from '@ionic/react';
import { ScrollHeaderInterface } from '../../interfaces';
import { validateScrollHeader } from '../../utils';

interface Props {
  overlayHeader?: string;
  overlayColor?: string;
  overlayPlay?: Function;
  content?: React.ReactNode | null;
  className?: string;
  title?: string | null;
}

class HeaderOverlayComponent extends React.Component<Props> {
  ref?: React.RefObject<HTMLDivElement> = React.createRef();
  animationRef?: React.RefObject<CreateAnimation> = React.createRef();
  private lastValidScroll: ScrollHeaderInterface = {
    direction: 'scrollUp',
    blur: false,
    animation: 'reverse'
  };
  public static defaultProps = {};

  public handleParentScroll(event: CustomEvent<any>): void {
    this.playTopHeader(validateScrollHeader(event));
  }

  public playTopHeader(
    currentScroll: ScrollHeaderInterface,
    scrollDownDuration: number = 500,
    scrollUpDuration: number = 1200
  ): void {
    if (!currentScroll.validScroll) return;
    if (!this.animationRef) return;
    if (currentScroll.direction === this.lastValidScroll.direction) return;

    this.lastValidScroll = currentScroll;
    const parent = this.animationRef.current!.animation;
    parent
      .direction(currentScroll.animation)
      .duration(
        currentScroll.direction === 'scrollDown'
          ? scrollDownDuration
          : scrollUpDuration
      )
      .play();
  }

  render(): React.ReactNode {
    const { content, title, children, className } = this.props;
    return (
      <CreateAnimation
        ref={this.animationRef}
        duration={500}
        fromTo={{
          property: 'opacity',
          fromValue: '0',
          toValue: '1'
        }}
      >
        <div className={'top-header ' + className} ref={this.ref}>
          {content}
          {title}
          <div>{children}</div>
        </div>
      </CreateAnimation>
    );
  }
}

export default HeaderOverlayComponent;
