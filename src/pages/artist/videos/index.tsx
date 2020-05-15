import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  HeaderOverlay,
  Header,
  BackgroundImage,
  SliderVideo,
  CardVideo,
  SectionTitle
} from 'components';
import { Sizes, ShapesSize, Nullable } from 'types';
import { VideosBetaInterface } from 'models';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from 'reducers';
import { getArtistVideosAPI, updateSettingsProperty } from 'actions';

interface StateProps {
  videos: Nullable<VideosBetaInterface[]>;
  loading: boolean;
}

interface DispatchProps {
  getArtistVideosAPI: (artistID: string) => void;
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

  componentDidMount(): void {
    this.props.getArtistVideosAPI(this.props.match.params.id);
  }

  /** NOTE: will avoid double render */
  shouldComponentUpdate(nextProps): boolean {
    if (this.props.videos || nextProps.videos) return true;
    return false;
  }

  onOpenVideo(id: number): void {
    this.props.history.push(
      `/artist/${this.props.match.params.id}/video/${id}`
    );
  }

  render(): React.ReactNode {
    const { videos, loading } = this.props;
    if (loading) return <div />;
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
            {videos && (
              <React.Fragment>
                <SectionTitle
                  className="mx-2"
                  title={'Recent Videos'}
                  viewAll={true}
                />
                <div className="slick-list-no-margin">
                  <SliderVideo
                    data={videos[0].videos}
                    size={Sizes.sm}
                    type={ShapesSize.normal}
                    onClick={this.onOpenVideo.bind(this)}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="row showcase ">
              <SectionTitle className="mx-2" title={'Showcase'} />
              {videos &&
                videos[1].videos.map(
                  (video, i): React.ReactNode => {
                    return (
                      <CardVideo
                        onClick={this.onOpenVideo.bind(this, i)}
                        id={i}
                        key={i}
                        size={Sizes.full}
                        type={ShapesSize.full}
                        title={video.description}
                        time={video.duration}
                        video={video.url}
                        image={video.thumbnail}
                      />
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
  const { videos, loading } = artistAPI;
  return { videos, loading };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistVideosAPI,
    updateSettingsProperty
  })(ArtistVideosPage)
);
