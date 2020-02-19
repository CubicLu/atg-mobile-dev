import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {
  MessageIcon,
  RadioIcon,
  PhoneWithHeadsetIcon,
  ProfileIcon,
  SearchIcon,
  _
} from './../../components';
import { updateSettingsProperty } from './../../actions';
import { ApplitcationState } from '../../reducers';
import {
  IonTabs,
  IonTabBar,
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
import { TabsInterface } from '../../interfaces';

interface StateProps {
  activeTab: string;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props extends StateProps, DispatchProps {}

class TabComponent extends React.Component<Props> {
  render(): React.ReactNode {
    let tabs: TabsInterface[] = [
      {
        path: '/home/feed',
        icon: (
          <PhoneWithHeadsetIcon
            color={this.props.activeTab === 'feed' ? '#00BAFF' : '#FFF'}
          />
        ),
        id: 'feed',
        component: FeedPage,
        redirect: true
      },
      {
        path: '/home/messages',
        icon: (
          <MessageIcon
            color={this.props.activeTab === 'messages' ? '#00BAFF' : '#FFF'}
          />
        ),
        id: 'messages',
        component: MessagesPage
      },
      {
        path: '/home/profile',
        icon: (
          <ProfileIcon
            color={this.props.activeTab === 'profile' ? '#00BAFF' : '#FFF'}
          />
        ),
        id: 'profile',
        component: ProfilePage
      },
      {
        path: '/home/search',
        icon: (
          <SearchIcon
            color={this.props.activeTab === 'search' ? '#00BAFF' : '#FFF'}
          />
        ),
        id: 'search',
        component: SearchPage
      },
      {
        path: '/home/radio',
        icon: (
          <RadioIcon
            color={this.props.activeTab === 'radio' ? '#00BAFF' : '#FFF'}
          />
        ),
        id: 'radio',
        component: RadioPage
      }
    ];
    let redirectIndex = _.findIndex(tabs, (x): any => x.redirect === true);

    return (
      <IonTabs
        onIonTabsWillChange={(event): void => {
          this.props.updateSettingsProperty('activeTab', event.detail.tab);
        }}
      >
        <IonRouterOutlet>
          {!_.isUndefined(redirectIndex) && (
            <Redirect exact path="/home" to={tabs[redirectIndex].path} />
          )}
          {_.map(tabs, (data, index): any => {
            return (
              <Route path={data.path} component={data.component} key={index} />
            );
          })}
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="dark">
          {_.map(tabs, (data, index): any => {
            return (
              <IonTabButton tab={data.id} href={data.path} key={index}>
                {data.icon}
              </IonTabButton>
            );
          })}
        </IonTabBar>
      </IonTabs>
    );
  }
}

const mapStateToProps = ({ settings }: ApplitcationState): StateProps => {
  const { activeTab } = settings;
  return { activeTab };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(TabComponent);
