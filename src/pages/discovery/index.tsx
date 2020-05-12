import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  SectionTitle
} from './../../components';
import { ApplicationState } from '../../reducers';
import { getCommunityStoriesAPI } from '../../actions';
import { IonPage, IonContent, IonImg } from '@ionic/react';
import { connect } from 'react-redux';
import { StorieInterface } from '../../models';

interface StateProps {
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps {}

class DiscoveryPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="discovery-page">
        <BackgroundImage default />
        <Header leftBackButton={false}>
          <div className="feed mx-3 mt-45">
            <div className="brand-title text-42">panthr</div>
          </div>
        </Header>

        <IonContent>
          <SectionTitle
            className="mt-4 mx-3"
            title={'DAILY DRIP'}
            viewAll={false}
          />
          <SliderStories
            labelKey="label"
            imageKey="image"
            data={this.props.stories}
          />

          <SectionTitle
            className="mt-4 mx-3"
            title="WHAT´S HOT"
            viewAll={false}
          />
          <div
            className="row no-padding mx-2"
            style={{ height: 'auto', minHeight: 500 }}
          >
            <div className={'col s6'}>
              <IonImg style={{ height: 230 }} src={undefined} />
            </div>
            <div className={'col s6'}>
              <IonImg style={{ height: 230 }} src={undefined} />
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { stories } = communityAPI;
  return { stories };
};

export default connect(mapStateToProps, {
  getCommunityStoriesAPI
})(DiscoveryPage);
