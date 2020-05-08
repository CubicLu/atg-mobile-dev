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
                    this.props.selectedChips?.splice(i, 1);
                    this.forceUpdate();
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

export default withRouter(VaultFilterSectionComponent);
