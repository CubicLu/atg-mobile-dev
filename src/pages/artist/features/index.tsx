import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import {
  ArtistInterface,
  PlaylistInterface,
  SongInterface
} from '../../../interfaces';
import {
  SliderVideo,
  SliderMixtapes,
  SliderRadio,
  SliderEvents,
  SectionTitle as Section,
  ArrowRightIcon,
  SliderMembers
} from './../../../components';
import { setPlaylist } from './../../../actions/playerActions';
import { guitarPlaylist as playlist } from '../../../reducers/playerReducer';
interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface DispatchProps extends StateProps {
  setPlaylist: (playlist: PlaylistInterface, song: SongInterface) => void;
}

class ArtistFeaturesPage extends React.Component<DispatchProps> {
  render(): React.ReactNode {
    const { currentArtist, setPlaylist } = this.props;
    if (!currentArtist) return <div />;

    const {
      featuredTracks,
      newReleases,
      radio,
      events,
      username,
      bandMembers
    } = currentArtist;

    return (
      <div className={'artist-features-page mb-3'}>
        <div className="row" />
        <div className="row">
          <Section className="mx-3" title={'TOP TRACKS'} viewAll={true} />
          {featuredTracks?.map(
            (track, i): React.ReactNode => (
              <div
                onClick={(): void => setPlaylist(playlist, playlist.items[i])}
                className="flex mx-3 mb-25 mt-1 f4 l11"
                key={i}
              >
                {track.song}
                <div className="align-end">
                  <ArrowRightIcon />
                </div>
              </div>
            )
          )}
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
            <SliderRadio diameter="110px" data={radio} />
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

        {bandMembers && (
          <div>
            <Section
              className="mx-3"
              title={'BAND MEMBER BIOS'}
              viewAll={false}
            />
            <SliderMembers
              data={bandMembers}
              size="100px"
              labelClassName="f6"
            />
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

export default connect(mapStateToProps, { setPlaylist })(ArtistFeaturesPage);
