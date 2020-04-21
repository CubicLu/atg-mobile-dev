import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { InputChip, InputToggle } from '../../components';
import { ArrowRightIcon } from '../icon';

interface Props extends RouteComponentProps {
  label?: string;
  action?: any;
  type: 'chip' | 'toggle';
  selectedChips?: string[];
}

class VaultFilterSectionComponent extends React.Component<Props> {
  removeElement(i: number): void {
    this.props.selectedChips?.splice(i, 1);
  }
  render(): React.ReactNode {
    return (
      <div className={'vault-filter row'}>
        <div className={'col label flex fluid s9'}>
          {this.props.label}
          {this.props.type === 'chip' && (
            <div
              style={{ position: 'absolute', right: 32 }}
              onClick={(): void =>
                this.props.history.push('/vault-filter/genre')
              }
            >
              <ArrowRightIcon />
            </div>
          )}
        </div>
        {this.props.type === 'toggle' ? (
          <InputToggle action={this.props.action} />
        ) : (
          <div className={'mt-1'} style={{ display: 'inline-block' }}>
            {this.props.selectedChips?.map(
              (chip: string, i: number): React.ReactNode => (
                <InputChip
                  key={i}
                  label={chip}
                  action={this.removeElement(i)}
                />
              )
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(VaultFilterSectionComponent);
