import React from 'react';
import {
  Header,
  ButtonIcon,
  BackIcon,
  _,
  BackgroundImage,
  CardAlbumGallery
} from './../../../components';
import { IonContent } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import {
  updateArtistProperty,
  updateSettingsProperty
} from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface State {}

interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
}

interface DispatchProps {
  updateArtistProperty: (property: string, value: any) => void;
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
  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      let artist = _.find(
        this.props.artists,
        (x): any => x.username === this.props.match.params.id
      );

      if (artist !== undefined) {
        this.props.updateArtistProperty('currentArtist', artist);
      }
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
            />

            <div className="row">
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
      </IonContent>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, artists } = artistAPI;
  return { currentArtist, artists };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty,
    updateSettingsProperty
  })(ArtistGalleryPage)
);
