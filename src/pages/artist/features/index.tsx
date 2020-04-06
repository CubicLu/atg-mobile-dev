import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';
import {
  List,
  SliderVideo,
  SliderMixtapes,
  SliderRadio,
  SliderEvents,
  SectionTitle as Section
} from './../../../components';
import { setPlaylistPlayer } from './../../../actions/playerActions';
interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface DispatchProps extends StateProps {
  setPlaylistPlayer: () => void;
}

class ArtistFeaturesPage extends React.Component<DispatchProps> {
  render(): React.ReactNode {
    const { currentArtist } = this.props;
    if (!currentArtist) return <div />;

    const {
      featuredTracks,
      newReleases,
      radio,
      events,
      username
    } = currentArtist;

    return (
      <div className={`artist-features-page`}>
        <div className="row" />
        <div className="row">
          <Section className="mx-3" title={'TOP TRACKS'} viewAll={true} />
          <List
            onClick={(): void => this.props.setPlaylistPlayer()}
            data={featuredTracks}
            label={'song'}
            id={'id'}
          />
        </div>

        {newReleases && (
          <div className="row">
            <Section className="mx-3" title={'VIDEOS'} viewAll={true} />
            {newReleases && <SliderVideo data={newReleases} />}
          </div>
        )}

        <div className="row">
          <Section className="mx-3" title={'PANTHR Playlists'} viewAll={true} />
          <SliderMixtapes
            title={'PANTHR Playlists'}
            menu={false}
            dots={false}
          />
        </div>

        <div className="row" />
        {radio && (
          <React.Fragment>
            <Section className="mx-3" title={'PANTHR RADIO'} viewAll={true} />
            <SliderRadio data={radio} />
          </React.Fragment>
        )}
        <div className="row mx-05" />

        {Array.isArray(events) && events.length > 0 && (
          <div>
            <Section
              className="mx-3"
              title={'UPCOMING EVENTS'}
              viewAll={true}
            />
            <SliderEvents data={[events![0]]} artistUsername={username} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default connect(mapStateToProps, { setPlaylistPlayer })(
  ArtistFeaturesPage
);
