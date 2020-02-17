import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {} from './../../components';
import {} from './../../actions';
import { ApplitcationState } from '../../reducers';
import {
  IonTabs,
  IonLabel,
  IonTabBar,
  IonIcon,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';
import {
  FeedPage,
  MessagesPage,
  ProfilePage,
  SearchPage,
  RadioPage
} from './../../pages';

interface Props {}

class TabComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/feed" />
          <Route path="/home/feed" component={FeedPage} />
          <Route path="/home/messages" component={MessagesPage} />
          <Route path="/home/profile" component={ProfilePage} />
          <Route path="/home/search" component={SearchPage} />
          <Route path="/home/radio" component={RadioPage} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="dark">
          <IonTabButton tab="feed" href="/home/feed">
            <IonIcon name="calendar" />
            <IonLabel>Feed</IonLabel>
          </IonTabButton>
          <IonTabButton tab="messages" href="/home/messages">
            <IonIcon name="calendar" />
            <IonLabel>Messages</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/home/profile">
            <IonIcon name="person-circle" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/home/search">
            <IonIcon name="calendar" />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="radio" href="/home/radio">
            <IonIcon name="calendar" />
            <IonLabel>Radio</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  }
}

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(TabComponent);
