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
import { Colors, ShapesSize } from '../../interfaces';

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
          rightCloseOnClick={(): void => this.props.history.push('/')}
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
          <div className="search-page">
            <BackgroundImage
              gradient={`180deg,#1F0739,#1F0739`}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              backgroundTopDark
              backgroundTopOpacity={0.7}
            />
            <div className={`content-container`}>
              <input
                placeholder={'Filter My Vault'}
                type={'text'}
                className="input text"
              />
              <div
                className="mt-3 search-outline-purple"
                style={{ marginTop: 16, marginBottom: 16 }}
              />
              <div className={'row'}>
                <VaultFilterSection
                  label={'View Tracks'}
                  action={e => console.log('view tracks:', e.detail.checked)}
                  type={'toggle'}
                />
                <VaultFilterSection
                  label={'View Videos'}
                  action={e => console.log('view tracks:', e.detail.checked)}
                  type={'toggle'}
                />
                <VaultFilterSection
                  label={'View Photos'}
                  action={e => console.log('view tracks:', e.detail.checked)}
                  type={'toggle'}
                />
                <VaultFilterSection
                  label={'Show Supported'}
                  action={e => console.log('view tracks:', e.detail.checked)}
                  type={'toggle'}
                />
                <VaultFilterSection
                  label={'Show by Genre'}
                  action={e => console.log('view tracks:', e.detail.checked)}
                  type={'chip'}
                  selectedChips={['Rock', 'Country', 'Rap']}
                />
                <VaultFilterSection
                  label={'Show by Era'}
                  action={e => console.log('view tracks:', e.detail.checked)}
                  type={'chip'}
                  selectedChips={['90s', '80s', '70s', '60s']}
                />
                <Button
                  color={Colors.tertiary}
                  label={'Reset'}
                  gradient
                  type={ShapesSize.rounded}
                  className={'ml-1 mt-5'}
                  onClick={() => alert('reset')}
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
