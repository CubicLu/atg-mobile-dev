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
  current_artist: ArtistInterface | null;
  is_playing: boolean;
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ArtistFeaturesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div
        className={
          `artist-features-page` + (this.props.is_playing && ' is-playing')
        }
      >
        <List
          data={this.props.current_artist?.featured_tracks}
          title={'TRACKS'}
          viewAll
          label={'song'}
          id={'id'}
        />
        <SliderVideo
          data={this.props.current_artist?.new_releases}
          title={'VIDEOS'}
        />
        <SliderMixtapes title={'PANTHR Playlists'} menu={false} dots={false} />
        <SliderRadio
          title={'PANTHR RADIO'}
          data={this.props.current_artist?.radio}
        />
        <SliderEvents
          data={[
            this.props.current_artist?.events !== undefined
              ? this.props.current_artist?.events[0]
              : {}
          ]}
          viewAll
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
  const { current_artist } = artistAPI;
  const { is_playing } = settings;
  return { current_artist, is_playing };
};

export default withRouter(connect(mapStateToProps, {})(ArtistFeaturesPage));
