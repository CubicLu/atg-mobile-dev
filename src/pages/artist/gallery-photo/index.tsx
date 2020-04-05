import React from 'react';
import { Header, PhotoChat } from './../../../components';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  getArtistAPI,
  updateSettingsProperty,
  getArtistGalleryCommentsAPI
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { ArtistInterface, CommentInterface } from '../../../interfaces';
import { validateScrollHeader } from '../../../utils';

interface State {
  displayChat: boolean;
  displayHeader: boolean;
  currentGalleryComments: number;
}

interface StateProps {
  currentArtist: ArtistInterface | null;
  currentGalleryComments: CommentInterface[];
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  getArtistGalleryCommentsAPI: (photoId: number, username: string) => void;
}

interface MatchParams {
  id: string;
  galleryId: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGalleryPhotoPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      displayChat: false,
      displayHeader: true,
      currentGalleryComments: 10
    };
  }

  callbackFunction = (childData: boolean, showHeader?: boolean): void => {
    this.setState({ displayChat: childData });
    if (showHeader) this.setState({ displayHeader: true });
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist === null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    this.props.getArtistGalleryCommentsAPI(0, 'pharell-williams');
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

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event);
    if (!currentScroll.validScroll) return;
    this.setState({ displayHeader: !currentScroll.blur });
  }

  render(): React.ReactNode {
    return (
      <IonPage id="gallery-photo-page">
        <div>
          {this.state.displayHeader && (
            <Header
              rightButtonGroup
              parentCallback={this.callbackFunction}
              overlay={this.props.currentGalleryComments.length}
            />
          )}
        </div>
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={this.handleScroll.bind(this)}
          style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
        >
          <div className={`artist-gallery-photo-page`}>
            <div style={{ marginTop: 100 }}>
              <IonImg src={this.getImage()} />
            </div>
          </div>
        </IonContent>
        <PhotoChat
          displayChat={this.state.displayChat}
          parentCallback={this.callbackFunction}
          currentPostComments={this.props.currentGalleryComments}
        />
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, currentGalleryComments } = artistAPI;
  return { currentGalleryComments, currentArtist };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty,
    getArtistGalleryCommentsAPI
  })(ArtistGalleryPhotoPage)
);
