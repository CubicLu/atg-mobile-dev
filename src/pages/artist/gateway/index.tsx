import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { clearCurrentArtist, getArtistAPI } from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { ArtistInterface } from '../../../interfaces';
import { BackgroundImage, RadioIcon, BackIcon } from '../../../components';

interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  clearCurrentArtist: () => void;
}

interface MatchParams {
  artistId: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGatewayPage extends React.Component<Props> {
  componentDidUpdate(prev: Props): void {
    const { currentArtist, getArtistAPI, match } = this.props;
    if (prev.loading) return;
    if (this.props.loading) return;
    if (
      currentArtist == null ||
      currentArtist.username !== match.params.artistId
    ) {
      getArtistAPI(match.params.artistId);
    }
  }

  componentWillUnmount(): void {
    this.props.clearCurrentArtist();
  }

  transferToBrandedRadio = (): void => {
    const { history, match } = this.props;
    history.push(`/radio/${match.params.artistId}`);
  };

  transferToArtistHomePage = (): void => {
    const { history, match } = this.props;
    history.push(`/artist/${match.params.artistId}`, { gateway: true });
  };

  render(): React.ReactNode {
    const { currentArtist } = this.props;
    return (
      <IonPage id="artist-gateway-page">
        <div className={'artist-gateway__header'}>
          <div className="artist-gateway__header--content">
            <h2>panthr</h2>
            <h3>artist-to-fan</h3>
          </div>
        </div>
        <IonContent
          fullscreen={true}
          style={{
            overflow: 'auto',
            zIndex: 1,
            backgroundColor: '#000'
          }}
        >
          <div className="artist-gateway__content">
            <div className="artist-gateway__content--info-block">
              <div className="artist-gateway__content--info-block--buttons">
                <div
                  className={
                    'artist-gateway__content--info-block--buttons-radio default-button dark'
                  }
                  onClick={this.transferToBrandedRadio}
                >
                  <RadioIcon />
                </div>
                <div
                  className={
                    'artist-gateway__content--info-block--buttons-arrow default-button dark'
                  }
                  onClick={this.transferToArtistHomePage}
                >
                  <BackIcon />
                </div>
              </div>

              <h1>{currentArtist?.name}</h1>
              <h5>Lil Nas X takes on Country Music</h5>
            </div>
          </div>
          {currentArtist?.cover.videoCover ? (
            <div className="artist-gateway__video-container">
              <video autoPlay playsInline loop>
                <source src={currentArtist?.cover.videoCover} />
              </video>
            </div>
          ) : (
            <BackgroundImage
              gradient="180deg,#652ddd,#2c0d5c"
              backgroundImage={
                currentArtist?.cover?.biography || currentArtist?.cover?.main
              }
            />
          )}
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, loading } = artistAPI;
  return { currentArtist, loading };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    clearCurrentArtist
  })(ArtistGatewayPage)
);
