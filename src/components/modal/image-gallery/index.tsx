import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BackIcon, ArrowRightIcon } from '../../icon';
import { GalleryImageInterface } from '../../../interfaces';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface State {
  reset: boolean;
}

interface StateProps {
  fullScreenImage: string | null;
  fullScreenImageIndex: number;
}

interface DispatchProps {}

interface OwnProps {
  currentGallery: GalleryImageInterface[] | null;
  galleryLength: number;
  changePage: (increase?: boolean) => void;
}

interface Props extends StateProps, DispatchProps, OwnProps {}

class FullScreenImageModalComponent extends React.Component<Props, State> {
  changePageHandler = (reset, increase?: boolean): (() => void) => (): void => {
    const { changePage } = this.props;
    changePage(increase);
    setTimeout((): void => {
      reset();
    }, 100);
  };

  render(): React.ReactNode {
    const { galleryLength, fullScreenImage, fullScreenImageIndex } = this.props;

    return (
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}
      >
        {({
          resetTransform
        }: {
          resetTransform: () => void;
        }): React.ReactNode => (
          <>
            <div className="full-screen-image-icons">
              {fullScreenImageIndex > 0 && (
                <div
                  className="full-screen-image-icons__leftIcon"
                  onClick={this.changePageHandler(resetTransform)}
                >
                  <BackIcon />
                </div>
              )}
              {fullScreenImageIndex < galleryLength - 1 && (
                <div
                  className="full-screen-image-icons__rightIcon"
                  onClick={this.changePageHandler(resetTransform, true)}
                >
                  <ArrowRightIcon />
                </div>
              )}
            </div>
            <TransformComponent>
              <div className="full-screen-image">
                <div className="full-screen-image__imageContainer">
                  <img src={`${fullScreenImage}`} alt="" />
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { fullScreenImage, fullScreenImageIndex } = artistAPI;
  return { fullScreenImage, fullScreenImageIndex };
};

export default connect(mapStateToProps, {})(FullScreenImageModalComponent);
