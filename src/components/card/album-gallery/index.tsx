import React from 'react';
import { ShapesSize } from '../../../types';
import { ContentLoader } from '../../index';
import { IonImg } from '@ionic/react';

interface State {
  isReady: boolean;
}

interface Props {
  image: string | undefined;
  key: number;
  type?: ShapesSize;
  col: number;
  label?: string;
  quantity?: number;
  onClick: () => void;
}

class CardAlbumGalleryComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  public static defaultProps = {
    type: ShapesSize.rounded,
    col: 6,
    quantity: 0
  };

  render(): React.ReactNode {
    const { col, onClick, type, image, label, quantity } = this.props;
    return (
      <div className={`col s${col} card album-gallery`}>
        <IonImg
          onIonImgDidLoad={(): void => {
            this.setState({
              isReady: true
            });
          }}
          src={image}
          style={{ width: 0, height: 0, visibility: 'hidden' }}
        />
        <ContentLoader
          className="mt-3"
          speed={2}
          viewBox="0 0 200 300"
          baseUrl={window.location.pathname}
          backgroundColor="rgb(255,255,255)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.05}
          foregroundOpacity={0.15}
          style={
            this.state.isReady
              ? { visibility: 'hidden', display: 'none' }
              : { visibility: 'visible' }
          }
        >
          <rect x="20" y="0" rx="8" ry="8" width="180" height="200" />
          <rect x="20" y="220" width="180" height="20" />
          <rect x="20" y="250" width="150" height="10" />
        </ContentLoader>
        <div
          onClick={(): void => onClick()}
          style={
            this.state.isReady
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }
        >
          <div
            className={`image ${type}`}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="f6 bold">{label}</div>
          <span>{quantity} items</span>
        </div>
      </div>
    );
  }
}

export default CardAlbumGalleryComponent;
