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
import { Sizes, ShapesSize } from '../../../types';
import { ArtistInterface } from '../../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';

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

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
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
        <Header
          title="Videos"
          titleClassName="videos"
          leftBackOnClick={(): void => this.props.history.goBack()}
        />
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
                    size={Sizes.sm}
                    type={ShapesSize.normal}
                    onClick={this.onOpenVideo.bind(this)}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="row showcase ">
              <SectionTitle className="mx-2" title={'Showcase'} />
              {currentArtist?.videos?.showcase.map(
                (value, i): React.ReactNode => {
                  return (
                    <CardVideo
                      onClick={this.onOpenVideo.bind(this, i)}
                      id={i}
                      key={i}
                      size={Sizes.full}
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

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistVideosPage)
);
