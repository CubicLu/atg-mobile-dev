import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  HeaderOverlay,
  Header,
  BackgroundImage,
  SliderVideo,
  SectionTitle,
  ImageSkeleton
} from '../../../components';
import { ShapesSize } from '../../../types';
import { ArtistInterface } from '../../../models';

import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
}

interface MatchParams {
  id: string;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistVideosPage extends React.Component<Props, {}> {
  private headerRef: React.RefObject<any> = React.createRef();

  componentDidUpdate(prevProps): void {
    if (this.props.currentArtist === null) {
      return this.props.getArtistAPI(this.props.match.params.id);
    }
    if (
      prevProps.match.params.id !== this.props.match.params.id &&
      this.props.currentArtist?.username !== this.props.match.params.id
    ) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  onOpenVideo(id: number): void {
    this.props.history.push(
      `/artist/${this.props.match.params.id}/video/${id}`
    );
  }

  render(): React.ReactNode {
    const { currentArtist } = this.props;

    return (
      <IonPage id="artist-videos-page">
        <Header title="Videos" titleClassName="videos" />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <BackgroundImage default />
          <div className="content-container">
            {currentArtist?.videos?.recents && (
              <React.Fragment>
                <SectionTitle
                  className="mx-2"
                  title={'Recent Videos'}
                  viewAll={true}
                />
                <div className="slick-list-no-margin">
                  <SliderVideo
                    data={currentArtist?.videos?.recents}
                    type={ShapesSize.normal}
                    width={196}
                    height={110}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="row showcase">
              <SectionTitle className="mx-2" title={'Showcase'} />
              {currentArtist?.videos?.showcase.map(
                (value, i): React.ReactNode => {
                  return (
                    <div
                      onClick={(): void => this.onOpenVideo(i)}
                      key={i}
                      className="video-card-container mb-2 fluid"
                      data-time={value.time}
                    >
                      <ImageSkeleton
                        height={190}
                        divClassName="vertical-container"
                        src={value.image!}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default connect(mapStateToProps, {
  getArtistAPI,
  updateSettingsProperty
})(ArtistVideosPage);
