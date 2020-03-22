import React from 'react';
import { connect } from 'react-redux';
import { ModalSlide, Player } from './../../components';
import { updateSettingsProperty, updateSettingsModal } from './../../actions';
import { TabsInterface, LinksInterface } from '../../interfaces';
import { ApplicationState } from '../../reducers';
import { ModalSlideInterface } from '../../interfaces';
import { setHeight } from '../../utils';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';
import { ProfilePage } from '..';

interface StateProps {
  activeTab: string;
  tabs: TabsInterface[];
  links: LinksInterface[];
  isPlaying: boolean;
  modal: ModalSlideInterface;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  updateSettingsModal: (
    visible: boolean,
    content: React.ReactNode,
    className?: string
  ) => void;
}

interface Props extends StateProps, DispatchProps {}

class HomePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonReactRouter>
        <Player />
        <ModalSlide
          onClose={(): void => this.props.updateSettingsModal(false, null)}
          visible={this.props.modal.visible}
          height={setHeight(40)}
          classname={this.props.modal.classname}
        >
          {this.props.modal.content}
        </ModalSlide>
        <IonTabs
          onIonTabsDidChange={(event): void => {
            this.props.updateSettingsProperty('activeTab', event.detail.tab);
          }}
        >
          <IonRouterOutlet id="home">
            <Switch>
              {this.props.links.map((p: LinksInterface, i: number): any => (
                <Route exact path={p.path} component={p.component} key={i} />
              ))}
              {this.props.tabs.map((p: TabsInterface, i: number): any => (
                <Route exact path={p.path} component={p.component} key={i} />
              ))}
              <Route exact path="/home" component={ProfilePage} />
              <Route path="/" render={(): any => <Redirect to="/home" />} />
              <Route path="/" component={ProfilePage} />
            </Switch>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="dark">
            {this.props.tabs.map((p: TabsInterface): any => (
              <IonTabButton tab={p.id} href={p.path} key={p.id}>
                {React.createElement(p.icon, {
                  color: this.props.activeTab === p.id ? '#00BAFF' : '#FFF'
                })}
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { activeTab, tabs, links, isPlaying, modal } = settings;
  return { activeTab, tabs, links, isPlaying, modal };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateSettingsModal
})(HomePage);
