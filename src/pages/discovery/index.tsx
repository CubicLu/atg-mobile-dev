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
import { StorieInterface } from '../../interfaces';

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
      <IonPage id="discovery-page" className="discovery-page">
        <BackgroundImage
          default={false}
          backgroundImage={null}
          gradient="#230640 0%, #100914 100%"
        />
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
            title="WHAT'S HOT"
            viewAll={false}
          />
          <div className="row discovery-row">
            <div className="col s6 discovery-col">
              <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/1.png" />
            </div>
            <div className="col s6 discovery-col">
              <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/2.png" />
            </div>
            <div className="col s6 discovery-col">
              <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/3.png" />
            </div>
          </div>
          <div className="row discovery-row">
            <div className="col s6 discovery-col">
              <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/4.png" />
            </div>
            <div className="col s6 discovery-col">
              <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/5.png" />
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
