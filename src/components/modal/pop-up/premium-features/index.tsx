import React, { Component, ReactNode } from 'react';

interface Props {
  onSuccessClick: () => void;
  onDoneClick: () => void;
  title: string;
  description: string | ReactNode;
  artistAvatar?: string;
  confirmButtonContent?: string;
  cancelButtonContent?: string;
}

export default class PremiumFeaturesModalContentComponent extends Component<
  Props
> {
  static defaultProps = {
    confirmButtonContent: 'SUPPORT!',
    cancelButtonContent: 'Done'
  };
  render(): ReactNode {
    const {
      onSuccessClick,
      onDoneClick,
      title,
      description,
      artistAvatar,
      confirmButtonContent,
      cancelButtonContent
    } = this.props;
    return (
      <div className={'premium-features-modal'}>
        <div className="premium-features-modal__image-container">
          <img src={artistAvatar} alt="" />
        </div>
        <p className={'premium-features-modal--title'}>{title}</p>
        <p className={'premium-features-modal--description'}>{description}</p>
        <button className={'button-support'} onClick={onSuccessClick}>
          {confirmButtonContent}
        </button>
        <button className={'button-dismiss'} onClick={onDoneClick}>
          {cancelButtonContent}
        </button>
      </div>
    );
  }
}
