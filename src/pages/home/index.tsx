import React from 'react';
import { connect } from 'react-redux';
import { ModalSlide, Player, LoaderFullscreen } from './../../components';
import { TabsInterface, LinksInterface } from '../../interfaces';
import { ApplicationState } from '../../reducers';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { NotFoundPage } from '..';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';

interface StateProps {
  tabs: TabsInterface[];
  links: LinksInterface[];
}

class HomePage extends React.Component<StateProps> {
  activeTab: string = 'profile';
  render(): React.ReactNode {
    const { tabs, links } = this.props;
    return (
      <>
        <LoaderFullscreen />
        <IonReactRouter>
          <ModalSlide />
          <Player />
          <IonTabs
            onIonTabsDidChange={(event): void => {
              this.activeTab = event.detail.tab;
            }}
          >
            <IonRouterOutlet>
              {tabs.map((p: TabsInterface, i: number): any => (
                <Route exact path={p.path} component={p.component} key={i} />
              ))}
              {links.map((p: LinksInterface, i: number): any => (
                <Route exact path={p.path} component={p.component} key={i} />
              ))}
              <Redirect exact path="/" to="/profile" />
              <Route path="*" component={NotFoundPage} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color="dark" selectedTab={this.activeTab}>
              {tabs.map((p: TabsInterface): any => (
                <IonTabButton tab={p.id} href={p.path} key={p.id}>
                  <p.icon />
                </IonTabButton>
              ))}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { tabs, links } = settings;
  return { tabs, links };
};

export default connect(mapStateToProps)(HomePage);
