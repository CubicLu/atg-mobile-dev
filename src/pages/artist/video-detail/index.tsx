import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  VideoPlayer,
  ShareIcon,
  ButtonIcon
} from '../../../components';
import { ArtistInterface, Colors } from '../../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { shadowTitle } from '../../../utils';

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

class ArtistVideoDetailPage extends React.Component<Props, {}> {
  private headerRef: React.RefObject<any> = React.createRef();

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  bottomTiles(): React.ReactNode {
    return (
      <div className="bottom-tiles fluid">
        <div
          className="tile"
          onClick={(): void => {}}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
          )}
        >
          <span className="f6">Deep Dive</span>
        </div>
        <div
          className="tile"
          onClick={(): void => {}}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
          )}
        >
          <span className="f6">Community</span>
        </div>
        <div
          className="tile"
          onClick={(): void => {
            this.props.history.push('/home/track/default/2/1');
          }}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png'
          )}
        >
          <span className="f6">Artist Home</span>
        </div>
      </div>
    );
  }

  renderButtons(): React.ReactNode {
    return (
      <div className="row">
        <div className="col s12 flex-justify-center buttons">
          <ButtonIcon color={Colors.orange} icon={<ShareIcon />} />
          <ButtonIcon color={Colors.green} icon={<ShareIcon />} />
          <ButtonIcon color={Colors.blue} icon={<ShareIcon />} />
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <IonPage id="artist-videos-page">
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
          <div className="artist-video-detail-page">
            <VideoPlayer />
            <div className="content-container">{this.renderButtons()}</div>
            {this.bottomTiles()}
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
  })(ArtistVideoDetailPage)
);
