import React from 'react';
import { connect } from 'react-redux';
import { ModalSlide, Player, LoaderFullscreen } from './../../components';
import { updateSettingsProperty, updateSettingsModal } from './../../actions';
import { TabsInterface, LinksInterface } from '../../interfaces';
import { ApplicationState } from '../../reducers';
import { ModalSlideInterface } from '../../interfaces';
import { setHeight } from '../../utils';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/react';

interface StateProps {
  activeTab: string;
  tabs: TabsInterface[];
  links: LinksInterface[];
  isPlaying: boolean;
  modal: ModalSlideInterface;
  loading: boolean;
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
    const {
      updateSettingsModal,
      modal,
      activeTab,
      tabs,
      links,
      loading
    } = this.props;
    const redirect = (): JSX.Element => <Redirect to="/home/profile" />;
    return (
      <IonReactRouter>
        <LoaderFullscreen visible={loading} />
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

        <IonTabs
          onIonTabsDidChange={(event): void =>
            updateSettingsProperty('activeTab', event.detail.tab)
          }
        >
          <IonRouterOutlet>
            {links.map((p: LinksInterface, i: number): any => (
              <Route exact path={p.path} component={p.component} key={i} />
            ))}
            {tabs.map((p: TabsInterface, i: number): any => (
              <Route exact path={p.path} component={p.component} key={i} />
            ))}
            <Route exact path="/" render={redirect} />
            <Route exact path="/home" render={redirect} />
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
      </IonReactRouter>
    );
  }
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { activeTab, tabs, links, isPlaying, modal } = settings;
  const { loading } = artistAPI;
  return { activeTab, tabs, links, isPlaying, modal, loading };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateSettingsModal
})(HomePage);
