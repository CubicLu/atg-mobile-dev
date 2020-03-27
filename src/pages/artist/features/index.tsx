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
  SectionTitle
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

    const hasEvents = Array.isArray(events) && events.length > 0;

    return (
      <div className={`artist-features-page${isPlaying ? ' is-playing' : ''}`}>
        <SectionTitle title={'TOP TRACKS'} viewAll={true} />
        <List data={featuredTracks} label={'song'} id={'id'} />

        {newReleases && <SectionTitle title={'VIDEOS'} viewAll={true} />}
        {newReleases && <SliderVideo data={newReleases} />}

        <SliderMixtapes title={'PANTHR Playlists'} menu={false} dots={false} />

        {radio && <SectionTitle title={'PANTHR RADIO'} viewAll={true} />}
        {radio && <SliderRadio data={radio} />}

        {hasEvents && <SectionTitle title={'UPCOMING EVENTS'} viewAll={true} />}
        {hasEvents && (
          <SliderEvents data={[events![0]]} artistUsername={username} />
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
