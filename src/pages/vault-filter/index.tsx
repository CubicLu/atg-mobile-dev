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
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import { updateSettingsProperty } from '../../actions';
import { Colors, ShapesSize, Sizes } from '../../interfaces';

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface StateProps {
  eraFilters: object[];
  genreFilters: object[];
}
interface Props extends RouteComponentProps, DispatchProps, StateProps {}

class VaultFilterPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  selectedEras: string[] | undefined;
  selectedGenres: string[] | undefined;

  render(): React.ReactNode {
    // eslint-disable-next-line no-prototype-builtins
    if (this.props.eraFilters.hasOwnProperty('undefined')) {
      delete this.props.eraFilters['undefined'];
    }
    this.selectedEras = Object.keys(this.props.eraFilters);
    this.selectedGenres = Object.assign(this.props.genreFilters);
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
                  selectedChips={this.selectedGenres}
                />
                <VaultFilterSection
                  label={'Show by Era'}
                  type={'chip'}
                  selectedChips={this.selectedEras}
                />
                <Button
                  size={Sizes.md}
                  label="RESET"
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

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { eraFilters, genreFilters } = settings;
  return { eraFilters, genreFilters };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(VaultFilterPage)
);
