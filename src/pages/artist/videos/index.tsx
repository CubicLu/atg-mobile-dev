import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  HeaderOverlay,
  Header,
  BackgroundImage,
  SliderVideo,
  CardVideo,
  SectionTitle
} from '../../../components';
import { Sizes, ShapesSize, ArtistInterface } from '../../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
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

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  onOpenVideo(id: number): void {
    this.props.history.push(
      `/home/artist/${this.props.match.params.id}/video/${id}`
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
          <BackgroundImage
            gradient={`180deg,#1F0739,#1F0739`}
            backgroundTop
            backgroundBottom
            backgroundBottomDark={false}
            backgroundTopDark
            backgroundTopOpacity={0.7}
          />
          <div className="content-container">
            {currentArtist?.videos?.recents && (
              <React.Fragment>
                <SectionTitle title={'Recent Videos'} viewAll={true} />
                <div className="no-margin">
                  <SliderVideo
                    data={currentArtist?.videos?.recents}
                    size={Sizes.sm}
                    type={ShapesSize.normal}
                    onClick={this.onOpenVideo.bind(this)}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="row showcase">
              <SectionTitle title={'Showcase'} />
              {currentArtist?.videos?.showcase.map(
                (value, i): React.ReactNode => {
                  return (
                    <CardVideo
                      onClick={this.onOpenVideo.bind(this, i)}
                      id={i}
                      key={i}
                      size={Sizes.lg}
                      type={ShapesSize.full}
                      time={value.time}
                      video={value.video}
                      image={value.image}
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

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  const { isPlaying } = settings;
  return { currentArtist, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistVideosPage)
);
