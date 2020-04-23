import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  BackgroundImage,
  Button,
  Header,
  HeaderOverlay,
  VaultFilterSection
} from '../../components';
import { Colors, ShapesSize, Sizes } from '../../interfaces';

interface Props extends RouteComponentProps {}

class VaultFilterPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();

  render(): React.ReactNode {
    return (
      <IonPage id="vault-filter-page">
        <Header
          leftTitle="Filter"
          titleClassName="filter"
          rightCloseButton
          leftBackButton={false}
          rightCloseOnClick={(): void => this.props.history.push('/profile')}
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
          id="search-page"
        >
          <div className="vault-filter-page">
            <BackgroundImage default />
            <div className={'content-container'}>
              <input
                autoComplete="off"
                placeholder={'Filter My Vault'}
                type={'text'}
                className="input text"
              />
              <div
                className="mt-3 search-outline-purple"
                style={{ marginTop: 16, marginBottom: 16 }}
              />
              <div className={'row'}>
                <VaultFilterSection label={'View Tracks'} type={'toggle'} />
                <VaultFilterSection label={'View Videos'} type={'toggle'} />
                <VaultFilterSection label={'View Photos'} type={'toggle'} />
                <VaultFilterSection label={'Show Supported'} type={'toggle'} />
                <VaultFilterSection
                  label={'Show by Genre'}
                  type={'chip'}
                  selectedChips={['Rock', 'Country', 'Rap']}
                />
                <VaultFilterSection
                  label={'Show by Era'}
                  type={'chip'}
                  selectedChips={['90s', '80s', '70s', '60s', '50s', '40s']}
                />
                <Button
                  size={Sizes.full}
                  label="Reset"
                  type={ShapesSize.full}
                  color={Colors.tertiary}
                  gradient
                />
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(VaultFilterPage);
