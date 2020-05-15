import React from 'react';
import { CardArtist } from './../../../components';
import { getSubscriberArtistsAPI } from './../../../actions';
import { SubscriberArtistSupportedInterface } from '../../../models';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
interface StateProps {
  artists: SubscriberArtistSupportedInterface[];
}
interface DispatchProps {
  getSubscriberArtistsAPI: (subscriberId: number) => any;
}
interface Props extends StateProps, DispatchProps {}
class ProfileArtistsPage extends React.PureComponent<Props> {
  componentDidMount(): void {
    this.props.getSubscriberArtistsAPI(1);
  }
  render(): React.ReactNode {
    const { artists } = this.props;
    return (
      <div className="content">
        {artists.map(
          (data, i): React.ReactNode => (
            <CardArtist key={i} artist={data.artist} support={true} />
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ subscriberAPI }: ApplicationState): StateProps => {
  const { artists } = subscriberAPI;
  return { artists };
};
export default connect(mapStateToProps, { getSubscriberArtistsAPI })(
  ProfileArtistsPage
);
