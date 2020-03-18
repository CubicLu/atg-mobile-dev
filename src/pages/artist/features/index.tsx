import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  List,
  SliderVideo,
  SliderMixtapes,
  SliderRadio,
  SliderEvents
} from './../../../components';
import {} from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
}
interface DispatchProps {}
interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ArtistFeaturesPage extends React.Component<Props> {
  render(): React.ReactNode {
    if (!this.props.currentArtist) return null;

    const featureClass = `artist-features-page${
      this.props.isPlaying ? ' is-playing' : ''
    }`;

    return (
      <div className={featureClass}>
        <List
          data={this.props.currentArtist?.featuredTracks}
          title={'TRACKS'}
          viewAll
          label={'song'}
          id={'id'}
        />
        <SliderVideo
          data={this.props.currentArtist?.newReleases}
          title={'VIDEOS'}
        />
        <SliderMixtapes title={'PANTHR Playlists'} menu={false} dots={false} />
        <SliderRadio
          title={'PANTHR RADIO'}
          data={this.props.currentArtist?.radio}
        />
        <SliderEvents
          data={[
            this.props.currentArtist?.events !== undefined
              ? this.props.currentArtist?.events[0]
              : {}
          ]}
          viewAll
          artistUsername={this.props.currentArtist?.username}
          title={'UPCOMING EVENTS'}
        />
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

export default withRouter(connect(mapStateToProps, {})(ArtistFeaturesPage));
