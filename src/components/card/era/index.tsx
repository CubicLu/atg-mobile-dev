import React from 'react';
import { InputCheckbox } from '../../../components';
import { SubEraInterface } from '../../../models';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { updateSettingsProperty } from '../../../actions';
import { HistoryProps } from '../../../models/@commons/routeProps';

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface StateProps {
  eraFilters: object[];
  era: string;
}

interface Props extends StateProps, DispatchProps, HistoryProps {
  name: string;
  backgroundColor: string;
  subEra: SubEraInterface[];
  key: number;
}

class CardEraComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  render(): React.ReactNode {
    const state: any = this.props;
    let indeterminate = false,
      isChecked = false;
    let { backgroundColor, name, subEra } = this.props;

    (function checkSelectState(): void {
      if (!state?.eraFilters) return;
      const subErasQuantity = state.eraFilters[name]?.subEras.length;
      if (subErasQuantity === 0) {
        isChecked = false;
        indeterminate = false;
      } else if (subErasQuantity < subEra.length) {
        isChecked = false;
        indeterminate = true;
      } else if (subErasQuantity === subEra.length) {
        isChecked = true;
        indeterminate = false;
      }
    })();

    return (
      <div
        className={'card-era'}
        style={{
          backgroundColor: `${backgroundColor}`,
          borderRadius: 100,
          height: 144,
          width: 144
        }}
        onClick={(): void => {
          this.props.updateSettingsProperty(
            'eraFilters',
            this.props.eraFilters
          );
          this.props.updateSettingsProperty('era', this.props.name);
          this.props.updateSettingsProperty('subEra', this.props.subEra);
          this.props.history.push({
            pathname: '/vault-filter/era/sub-era',
            state: {
              era: state.name,
              subEra: state.subEra
            }
          });
        }}
      >
        <div className={'card-era-section'}>
          <span>{name}</span>
          <InputCheckbox checked={isChecked} indeterminate={indeterminate} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { eraFilters, era } = settings;
  return { eraFilters, era };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(CardEraComponent);
