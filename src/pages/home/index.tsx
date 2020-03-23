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
    const { updateSettingsModal, modal, activeTab, tabs, links } = this.props;
    return (
      <IonReactRouter>
        <Player />
        {modal && (
          <ModalSlide
            onClose={(): void => updateSettingsModal(false, null)}
            visible={modal.visible}
            height={setHeight(40)}
            className={modal.classname}
          >
            {modal.content}
          </ModalSlide>
        )}

        <Switch>
          <IonTabs
            onIonTabsDidChange={(event): void => {
              updateSettingsProperty('activeTab', event.detail.tab);
            }}
          >
            <IonRouterOutlet id="home">
              {links.map((p: LinksInterface, i: number): any => (
                <Route exact path={p.path} component={p.component} key={i} />
              ))}
              {tabs.map((p: TabsInterface, i: number): any => (
                <Route exact path={p.path} component={p.component} key={i} />
              ))}
              <Route exact path="/home" component={ProfilePage} />
              <Route
                exact
                path="/"
                render={(): any => <Redirect to="/home" />}
              />
              <Route path="/" component={ProfilePage} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color="dark">
              {tabs.map((p: TabsInterface): any => (
                <IonTabButton tab={p.id} href={p.path} key={p.id}>
                  {React.createElement(p.icon, {
                    color: activeTab === p.id ? '#00BAFF' : '#FFF'
                  })}
                </IonTabButton>
              ))}
            </IonTabBar>
          </IonTabs>
        </Switch>
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
