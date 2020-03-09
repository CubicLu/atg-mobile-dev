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
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ArtistFeaturesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="artist-features-page">
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
        <SliderMixtapes title={'FEATURED MIXTAPES'} />
        <SliderRadio
          title={'PANTHR RADIO'}
          data={this.props.currentArtist?.radio}
        />
        <SliderEvents
          data={this.props.currentArtist?.events}
          viewAll
          title={'UPCOMING EVENTS'}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(connect(mapStateToProps, {})(ArtistFeaturesPage));
