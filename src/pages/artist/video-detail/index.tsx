import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  VideoPlayer,
  ShareIcon,
  ButtonIcon,
  StarIcon,
  Chat,
  CloseIcon,
  ChatMessageIcon
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

interface State {
  readonly chatOpened: boolean;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistVideoDetailPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<any> = React.createRef();
  constructor(props: Props) {
    super(props);

    this.state = {
      chatOpened: false
    };
  }

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
          onClick={(): void => {
            this.props.history.push(
              `/home/artist/${this.props.match.params.id}/deep-dive`
            );
          }}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
          )}
        >
          <span className="f6">Deep Dive</span>
        </div>
        <div
          className="tile"
          onClick={(): void => {
            this.props.history.push(
              `/home/community/${this.props.match.params.id}`
            );
          }}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
          )}
        >
          <span className="f6">Community</span>
        </div>
        <div
          className="tile"
          onClick={(): void => {
            this.props.history.push(
              `/home/artist/${this.props.match.params.id}`
            );
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

  setChat(condition = false): void {
    this.setState({ chatOpened: condition });
  }

  renderButtons(): React.ReactNode {
    return (
      <div className="row">
        <div className="col s12 flex-justify-content-center buttons">
          <ButtonIcon color={Colors.orange} icon={<StarIcon />} />
          <ButtonIcon color={Colors.green} icon={<ShareIcon />} />
          <ButtonIcon
            styles={{ position: 'relative' }}
            color={Colors.cyan}
            icon={<ChatMessageIcon width={22} height={20} />}
            onClick={this.setChat.bind(this, true)}
            overlay={50}
          />
        </div>
      </div>
    );
  }

  renderChat(): React.ReactNode {
    return (
      <div className="chat-container h-100">
        <div className="row close">
          <div className="col s12 flex-justify-content-end">
            <ButtonIcon
              color={Colors.transparent}
              icon={<CloseIcon />}
              onClick={this.setChat.bind(this, false)}
            />
          </div>
        </div>
        <Chat />
      </div>
    );
  }

  renderContent(): React.ReactNode {
    return (
      <div className="content-container ">
        {this.renderButtons()}
        <div className="row mx-1">
          <h1 className="f3">Happy</h1>
          <p className="f6">
            Williams provided vocals for French duo Daft Punk’s 2013 album
            Random Access Memories, on the songs “Lose Yourself to Dance” and
            “Get Lucky”. After returning from the recording sessions in Paris,
            he attended a meeting with record label managers who said that the
            results were “spectacular” and that “Get Lucky” would be Daft Punk’s
            next single.
          </p>
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
          onIonScroll={(e): void =>
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
          <div className="artist-video-detail-page space-between mb-50">
            <VideoPlayer
              onClickClose={(): void => {
                this.props.history.goBack();
              }}
            />
            {this.state.chatOpened ? this.renderChat() : this.renderContent()}
            {!this.state.chatOpened && this.bottomTiles()}
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
