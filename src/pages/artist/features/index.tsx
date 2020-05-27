import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import {
  ArtistInterface,
  PlaylistInterface,
  SongInterface
} from '../../../models';
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
import {
  rivalSonsPlaylist,
  pharrellGirl
} from '../../../reducers/playerReducer';
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

    const playlist =
      this.props.currentArtist?.username === 'rival-sons'
        ? rivalSonsPlaylist
        : pharrellGirl;

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
            <Section
              className="mx-3"
              title={'VIDEOS'}
              viewAll={true}
              viewAllUrl={`/artist/${username}/video`}
            />
            {newReleases && (
              <SliderVideo
                showFooter={true}
                data={newReleases}
                width={250}
                height={140}
              />
            )}
          </div>
        )}

        <div className="row mb-5">
          <Section className="mx-3" title={'PANTHR Playlists'} viewAll={true} />
          <SliderMixtapes
            title={'PANTHR Playlists'}
            menu={false}
            dots={false}
          />
        </div>

        <div className="row mb-5" />
        {radio && (
          <React.Fragment>
            <Section
              className="mx-3"
              title={'PANTHR RADIO'}
              viewAll={true}
              viewAllUrl={`/radio/artist/${username}`}
            />
            <SliderRadio width={110} data={radio} />
          </React.Fragment>
        )}
        <div className="row mx-05 mb-5" />

        {Array.isArray(events) && events.length > 0 && (
          <div>
            <Section
              className="mx-3"
              title={'UPCOMING EVENTS'}
              viewAll={true}
              viewAllUrl={`/artist/${username}/event`}
            />
            <SliderEvents data={[events![0]]} artistUsername={username} />
          </div>
        )}

        {bandMembers && (
          <div className="mb-5">
            <Section
              className="mx-3"
              title={'BAND MEMBER BIOS'}
              viewAll={false}
            />
            <SliderMembers data={bandMembers} width={100} labelClassName="f6" />
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
