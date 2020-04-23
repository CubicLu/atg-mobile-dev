import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { connect } from 'react-redux';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  CardGenre,
  InputCheckbox
} from '../../../../components';
import { ApplicationState } from '../../../../reducers';
import { updateSettingsProperty } from '../../../../actions';

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface StateProps {
  eraFilters: object[];
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class VaultFilterSubEraPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  selectedSubEras: any = {};

  render(): React.ReactNode {
    const state: any = this.props.history.location.state;
    this.selectedSubEras[state?.era] = { subEras: [] };
    return (
      <IonPage id="vault-filter-genre-page">
        <Header
          leftTitle={state.era}
          titleClassName="sub-era"
          rightCloseButton
          leftBackButton={false}
          rightCloseOnClick={(): void =>
            this.props.history.push({
              pathname: '/vault-filter/era',
              state: { selectedSubEras: this.selectedSubEras }
            })
          }
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
          id="vault-filter-genre-page"
        >
          <div className="vault-filter-sub-era-page">
            <BackgroundImage
              gradient={'180deg,#1F0739,#1F0739'}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              backgroundTopDark
              backgroundTopOpacity={0.7}
            />
            <div className={'content-container'}>
              <div className={'row'}>
                {state.subEra?.map(
                  (data, i): React.ReactNode => {
                    return (
                      <div className={'col s6'} key={i}>
                        <CardGenre
                          name={data.name}
                          image={data.image}
                          shadowColor={data.color}
                          key={i}
                        />
                        <div
                          className={'flex my-2'}
                          style={{ whiteSpace: 'nowrap' }}
                          title={data.name}
                        >
                          <span className={'sub-era-card-label'}>
                            {data.name}
                          </span>
                          <InputCheckbox
                            checked={data.selected}
                            action={(e): void => {
                              let idx = this.selectedSubEras[
                                state.era
                              ].subEras.indexOf(data.name);
                              if (e.currentTarget.checked && idx === -1) {
                                this.selectedSubEras[state.era].subEras.push(
                                  data.name
                                );
                              } else {
                                this.selectedSubEras[state.era].subEras.splice(
                                  idx,
                                  1
                                );
                              }
                              this.props.updateSettingsProperty(
                                'eraFilters',
                                this.selectedSubEras
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { eraFilters } = settings;
  return { eraFilters };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(VaultFilterSubEraPage)
);
