import React, { Component, ReactNode } from 'react';

interface Props {
  onSuccessClick: () => void;
  onDoneClick: () => void;
  title: string;
  description: string | ReactNode;
  artistAvatar?: string;
}

export default class PremiumFeaturesModalContentComponent extends Component<
  Props
> {
  render(): ReactNode {
    const {
      onSuccessClick,
      onDoneClick,
      title,
      description,
      artistAvatar
    } = this.props;
    return (
      <div className={'premium-features-modal'}>
        <div className="premium-features-modal__image-container">
          <img src={artistAvatar} alt="" />
        </div>
        <p className={'premium-features-modal--title'}>{title}</p>
        <p className={'premium-features-modal--description'}>{description}</p>
        <button className={'button-support'} onClick={onSuccessClick}>
          SUPPORT!
        </button>
        <button className={'button-dismiss'} onClick={onDoneClick}>
          Done
        </button>
      </div>
    );
  }
}
