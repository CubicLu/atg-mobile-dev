import React from 'react';
import {
  Header,
  BackgroundImage,
  CardAlbumGallery,
  HeaderOverlay
} from './../../../components';
import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import {
  getArtistAPI,
  setCurrentGallery,
  updateSettingsProperty
} from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  setCurrentGallery: (galleryId: number) => void;
}

interface MatchParams {
  id: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGalleryPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist == null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  handleOnClick = (index: number): (() => void) => (): void => {
    this.props.history.push(
      `/artist/${this.props.currentArtist?.username}/gallery/${index}`
    );
    return this.props.setCurrentGallery(index);
  };

  render(): React.ReactNode {
    return (
      <IonPage id="gallery-page">
        <Header
          title="Gallery"
          leftBackOnClick={(): void =>
            this.props.history.replace(`/artist/${this.props.match.params.id}`)
          }
          //leftBackHref={`/artist/${this.props.match.params.id}`}
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <BackgroundImage default />
          <div className={'content-container'}>
            <div className={'row no-margin'}>
              {this.props.currentArtist?.gallery?.map(
                (data, index): React.ReactNode => (
                  <CardAlbumGallery
                    key={index}
                    onClick={this.handleOnClick(index)}
                    image={data.cover}
                    label={data.name}
                    quantity={data.quantity}
                    col={6}
                  />
                )
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
    updateSettingsProperty,
    setCurrentGallery
  })(ArtistGalleryPage)
);
