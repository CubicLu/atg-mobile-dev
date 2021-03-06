import React from 'react';
import {
  Header,
  CardEvent,
  BackgroundImage,
  HeaderOverlay
} from './../../../components';
import { IonContent, IonPage } from '@ionic/react';

import { ArtistInterface } from '../../../models';
import { getArtistAPI } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
}

interface MatchParams {
  id: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistEventsPage extends React.Component<Props, {}> {
  private headerRef: React.RefObject<any> = React.createRef();

  componentDidUpdate(prevProps): void {
    if (this.props.currentArtist === null) {
      return this.props.getArtistAPI(this.props.match.params.id);
    }
    if (
      prevProps.match.params.id !== this.props.match.params.id &&
      this.props.currentArtist?.username !== this.props.match.params.id
    ) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  render(): React.ReactNode {
    const { currentArtist } = this.props;
    if (!currentArtist) return <IonPage />;
    return (
      <IonPage id="events-page">
        <Header title="Events" titleClassName="events" />
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className="artist-events-page">
            <BackgroundImage backgroundImage={currentArtist.cover?.event} />
            <HeaderOverlay ref={this.headerRef} />
            <div className={'content-list'}>
              {currentArtist.events?.map(
                (data, i): React.ReactNode => (
                  <CardEvent
                    key={i}
                    data={data}
                    id={i}
                    artistUsername={currentArtist.username}
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

export default connect(mapStateToProps, { getArtistAPI })(ArtistEventsPage);
