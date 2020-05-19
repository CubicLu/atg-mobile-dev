import React from 'react';
import { InputChip, InputToggle } from '../../components';
import { ArrowRightIcon } from '../icon';
import { HistoryProps } from '../../models/@commons/routeProps';

interface Props extends HistoryProps {
  label?: string;
  action?: any;
  type: 'chip' | 'toggle';
  selectedChips?: string[];
}

export default class VaultFilterSectionComponent extends React.PureComponent<
  Props
> {
  render(): React.ReactNode {
    return (
      <div className={'vault-filter row'}>
        <div className={'label flex fluid'}>
          {this.props.label}
          {this.props.type === 'chip' && (
            <div
              style={{ position: 'absolute', right: 32 }}
              onClick={(): void =>
                this.props.label === 'Show by Genre'
                  ? this.props.history.push('/vault-filter/genre')
                  : this.props.history.push('/vault-filter/era')
              }
            >
              <ArrowRightIcon />
            </div>
          )}
        </div>
        {this.props.type === 'toggle' ? (
          <div className="flex-justify-content-end">
            <InputToggle action={this.props.action} />
          </div>
        ) : (
          <div className={'mt-1'} style={{ display: 'inline-block' }}>
            {this.props.selectedChips?.map(
              (chip: string, i): React.ReactNode => (
                <InputChip
                  key={i}
                  label={chip}
                  action={(): void => {
                    this.props.action(chip, i);
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    );
  }
}
