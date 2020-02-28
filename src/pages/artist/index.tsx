import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { _, BackgroundImage, Header } from './../../components';
import { updateArtistProperty } from './../../actions';
import { ApplicationState } from './../../reducers';
import { ArtistInterface } from '../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
}

interface DispatchProps {
  updateArtistProperty: (property: string, value: any) => void;
}

interface MatchParams {
  id: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistPage extends React.Component<Props> {
  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      let artist = _.find(
        this.props.artists,
        (x): any => x.username == this.props.match.params.id
      );

      if (artist != undefined) {
        this.props.updateArtistProperty('currentArtist', artist);
      }
    }
  }

  render(): React.ReactNode {
    return (
      <IonPage id="blank-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient={`180deg, ${this.props.currentArtist?.backgroundGradient.color1} 0%, ${this.props.currentArtist?.backgroundGradient.color2} 100%`}
            top
            imageTop={this.props.currentArtist?.cover.background}
            unique={true}
            topStyle={{ height: '100%' }}
          >
            <div className={`profile-page`}>
              <Header />
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, artists } = artistAPI;
  return { currentArtist, artists };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty
  })(ArtistPage)
);
