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
import { validateScrollHeader } from '../../../utils';
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

interface State {
  blur: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistVideosPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<any> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = { blur: false };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }
  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 30);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef && this.headerRef.current.playTopHeader(currentScroll);
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
          onIonScroll={this.handleScroll.bind(this)}
        >
          <div className="artist-videos-page">
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
