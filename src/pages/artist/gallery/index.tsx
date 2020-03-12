import React from 'react';
import {
  Header,
  ButtonIcon,
  BackIcon,
  _,
  BackgroundImage,
  CardAlbumGallery,
  LoaderFullscreen
} from './../../../components';
import { IonContent } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
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

class ArtistGalleryPage extends React.Component<Props> {
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
  render(): React.ReactNode {
    return (
      <IonContent
        scrollY={true}
        scrollEvents={true}
        onIonScrollStart={(): any => {}}
        onIonScroll={(): any => {}}
        onIonScrollEnd={(): any => {}}
        style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
      >
        <BackgroundImage
          gradient={`180deg,#1F0739,#1F0739`}
          backgroundTop
          backgroundBottom
          backgroundBottomDark={false}
          bottomRotate
          backgroundTopDark
          backgroundTopOpacity={0.7}
        >
          <div className="artist-gallery-page">
            <Header
              leftContent={
                <ButtonIcon
                  icon={<BackIcon color={'#FFF'} />}
                  onClick={(): void => {
                    this.props.history.goBack();
                  }}
                />
              }
              centerContent={<h1 className="title">Gallery</h1>}
              type={'fixed'}
            />

            <div className="row content-container">
              {_.map(
                this.props.currentArtist?.gallery,
                (data, index): React.ReactNode => {
                  return (
                    <CardAlbumGallery
                      key={index}
                      image={data.cover}
                      label={data.name}
                      quantity={data.items.length}
                      col={6}
                    />
                  );
                }
              )}
            </div>
          </div>
        </BackgroundImage>
        <LoaderFullscreen visible={this.props.loading} />
      </IonContent>
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
    updateSettingsProperty
  })(ArtistGalleryPage)
);
