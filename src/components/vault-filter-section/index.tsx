import React from 'react';
import { IonToggle, IonChip, IonIcon, IonLabel } from '@ionic/react';
import { ArrowRightIcon } from '../icon';

interface Props {
  label?: string;
  action?: any;
  type: 'chip' | 'toggle';
  selectedChips?: string[];
}

class VaultFilterSectionComponent extends React.Component<Props> {
  removeElement(i: number): void {
    this.props.selectedChips?.splice(i, 1);
    this.forceUpdate();
  }
  render(): React.ReactNode {
    return (
      <div className={'vault-filter row'}>
        <div className={'col label flex fluid'}>
          {this.props.label}
          {this.props.type === 'chip' && (
            <div style={{ position: 'absolute', right: 32 }}>
              <ArrowRightIcon />
            </div>
          )}
        </div>
        {this.props.type === 'toggle' ? (
          <IonToggle
            checked={true}
            onIonChange={this.props.action}
            slot="start"
            color={'secondary'}
          />
        ) : (
          <div className={'mt-1'} style={{ display: 'inline-block' }}>
            {this.props.selectedChips?.map(
              (chip: string, i: number): React.ReactNode => (
                <IonChip outline className={'chip mt-2'} key={i}>
                  <IonLabel>{chip}</IonLabel>
                  <IonIcon
                    name="close-circle"
                    className={'close-button'}
                    onClick={(): void => this.removeElement(i)}
                  />
                </IonChip>
              )
            )}
          </div>
        )}
      </div>
    );
  }
}

export default VaultFilterSectionComponent;
