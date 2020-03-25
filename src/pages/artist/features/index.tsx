import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';
import {
  List,
  SliderVideo,
  SliderMixtapes,
  SliderRadio,
  SliderEvents
} from './../../../components';

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
}
interface Props extends StateProps {}

class ArtistFeaturesPage extends React.Component<Props> {
  render(): React.ReactNode {
    const { currentArtist, isPlaying } = this.props;
    if (!currentArtist) return <div />;

    const {
      featuredTracks,
      newReleases,
      radio,
      events,
      username
    } = currentArtist;

    return (
      <div className={`artist-features-page${isPlaying ? ' is-playing' : ''}`}>
        <List
          data={featuredTracks}
          title={'TOP TRACKS'}
          viewAll
          label={'song'}
          id={'id'}
        />
        {newReleases && <SliderVideo data={newReleases} title={'VIDEOS'} />}

        <SliderMixtapes title={'PANTHR Playlists'} menu={false} dots={false} />

        {radio && <SliderRadio title={'PANTHR RADIO'} data={radio} />}

        {Array.isArray(events) && events.length > 0 && (
          <SliderEvents
            data={[events[0]]}
            viewAll
            artistUsername={username}
            title={'UPCOMING EVENTS'}
          />
        )}
      </div>
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

export default connect(mapStateToProps, {})(ArtistFeaturesPage);
