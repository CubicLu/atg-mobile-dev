import React from 'react';
import { Header, ButtonIcon, ShareIcon, StarIcon } from './../../../components';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { ArtistInterface, Colors } from '../../../interfaces';

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
  galleryId: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGalleryPhotoPage extends React.Component<Props> {
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist === null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.currentArtist === null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  getImage(): any {
    if (this.props.currentArtist?.gallery !== undefined) {
      let gallery = this.props.currentArtist?.gallery;
      if (gallery[this.props.match.params.galleryId] !== undefined) {
        const state = this.props.history.location.state;
        const image = (state as any)?.image;
        if (image !== undefined) {
          return image;
        } else {
          return;
        }
      }
    }
    return;
  }

  render(): React.ReactNode {
    return (
      <IonPage id="gallery-photo-page">
        <Header />
        <IonContent
          style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
        >
          <div className={`artist-gallery-photo-page`}>
            <div
              className={`content-container ${this.props.isPlaying &&
                ' is-playing'}`}
            >
              <IonImg src={this.getImage()} />
              <ul className="list inline menu-share">
                <li>
                  <ButtonIcon
                    color={Colors.orange}
                    icon={<StarIcon width={24} height={24} />}
                  />
                </li>
                <li>
                  <ButtonIcon
                    color={Colors.green}
                    icon={<ShareIcon width={22} height={20} />}
                  />
                </li>
              </ul>
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
  connect(mapStateToProps, { getArtistAPI, updateSettingsProperty })(
    ArtistGalleryPhotoPage
  )
);
