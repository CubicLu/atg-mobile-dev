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
      <div className={`artist-features-page ${isPlaying ? 'is-playing' : ''}`}>
        <div className="row" />
        <div className="row">
          <Section className="mx-3" title={'TOP TRACKS'} viewAll={true} />
          <List data={featuredTracks} label={'song'} id={'id'} />
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
          <div className="row">
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

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  const { isPlaying } = settings;
  return { currentArtist, isPlaying };
};

export default connect(mapStateToProps, {})(ArtistFeaturesPage);
