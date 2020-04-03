import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../reducers';
import { Header, BackgroundImage, InputSearch } from '../../components';

interface Props extends RouteComponentProps {}

class MessagePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="message-page">
        <Header title="Messages" />
        <IonContent>
          <BackgroundImage
            gradient={`180deg,#1F0739,#1F0739`}
            backgroundTop
            backgroundBottom
            backgroundBottomDark={false}
            backgroundTopDark
            backgroundTopOpacity={0.7}
          />
          <div className="message-page content-fixed" slot="fixed">
            <div className="row">
              <div className="col s12">
                <InputSearch
                  onChange={(e): void => {}}
                  value={''}
                  placeholder="Search"
                  debounce={150}
                />
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(MessagePage));
