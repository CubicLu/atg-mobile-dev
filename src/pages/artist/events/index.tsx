import React from 'react';
import {
  Header,
  ButtonIcon,
  BackIcon,
  _,
  CardEvent,
  LoaderFullscreen
} from './../../../components';
import { IonContent, IonList, IonItem } from '@ionic/react';
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

class ArtistEventsPage extends React.Component<Props> {
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
        <div className="artist-events-page">
          <div className="fixed-content">
            <div
              style={{
                backgroundImage: `url(${this.props.currentArtist?.cover.event})`
              }}
              className="background"
            />
            <Header
              leftContent={
                <ButtonIcon
                  icon={<BackIcon />}
                  onClick={(): void => {
                    this.props.history.goBack();
                  }}
                />
              }
              centerContent={<h1 className="title">Events</h1>}
            />
          </div>

          <div className="content-list">
            <IonList lines="none" className="list">
              {_.map(
                this.props.currentArtist?.events,
                (data, i): React.ReactNode => {
                  return (
                    <IonItem key={i}>
                      <CardEvent data={data} id={i} />
                    </IonItem>
                  );
                }
              )}
            </IonList>
          </div>
        </div>
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
  })(ArtistEventsPage)
);
