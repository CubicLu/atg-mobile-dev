import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { connect } from 'react-redux';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  CardSubEra,
  InputCheckbox
} from '../../../../components';
import { ApplicationState } from '../../../../reducers';
import { updateSettingsProperty } from '../../../../actions';
import { SubEraInterface } from '../../../../models';

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface StateProps {
  eraFilters: object[];
  era: string;
  subEra: SubEraInterface[];
}

interface Props extends StateProps, DispatchProps {
  history: any;
}

class VaultFilterSubEraPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();

  render(): React.ReactNode {
    if (!this.props.eraFilters[this.props.era]?.subEras)
      this.props.eraFilters[this.props.era] = { subEras: [] };

    const state: any = this.props;
    if (state.eraFilters[state?.era]) {
      state?.subEra?.forEach((item: any): void => {
        if (
          // @ts-ignore
          state.eraFilters[state.era].subEras.some(
            (r: any): boolean => r === item.name
          )
        ) {
          item.selected = true;
        }
      });
    }
    return (
      <IonPage id="vault-filter-sub-era-page">
        <Header
          leftTitle={state?.era}
          titleClassName="sub-era"
          rightCloseButton
          leftBackButton={false}
          rightCloseHref="/vault-filter/era"
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
                {state?.subEra?.map(
                  (data, i): React.ReactNode => {
                    return (
                      <div className={'col s6'} key={i}>
                        <CardSubEra
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
                              let idx = state.eraFilters[
                                state.era
                                // @ts-ignore
                              ].subEras.indexOf(data.name);
                              if (e.currentTarget.checked && idx === -1) {
                                // @ts-ignore
                                state.eraFilters[state.era].subEras.push(
                                  data.name
                                );
                              } else {
                                // @ts-ignore
                                state.eraFilters[state.era].subEras.splice(
                                  idx,
                                  1
                                );
                              }
                              this.props.updateSettingsProperty(
                                'eraFilters',
                                state.eraFilters
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
  const { eraFilters, era, subEra } = settings;
  return { eraFilters, era, subEra };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(VaultFilterSubEraPage);
