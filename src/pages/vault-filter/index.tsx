import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import {
  BackgroundImage,
  Button,
  Header,
  HeaderOverlay,
  VaultFilterSection
} from '../../components';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import {
  updateSettingsProperty,
  removeSelectedGenre,
  removeSelectedEra
} from '../../actions';
import { Colors, ShapesSize, Sizes } from '../../types';

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  removeSelectedGenre: (item: string, i: number) => void;
  removeSelectedEra: (item: string, i: number) => void;
}

interface StateProps {
  eraFilters: object[];
  genreFilters: object[];
  selectedGenres: string[];
  selectedEras: string[];
}
interface Props extends DispatchProps, StateProps {}

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
          rightCloseHref="/profile"
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
                  selectedChips={this.props.selectedGenres}
                  action={(chip, i): void => {
                    this.props.removeSelectedGenre(chip, i);
                  }}
                />
                <VaultFilterSection
                  label={'Show by Era'}
                  type={'chip'}
                  selectedChips={Object.keys(this.props.eraFilters)}
                  action={(chip, i): void => {
                    this.props.removeSelectedEra(chip, i);
                  }}
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
  const { eraFilters, genreFilters, selectedEras, selectedGenres } = settings;
  return { eraFilters, genreFilters, selectedEras, selectedGenres };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  removeSelectedGenre,
  removeSelectedEra
})(VaultFilterPage);
