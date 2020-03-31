import React from 'react';
import { ArrowRightIcon } from './../../components';

interface Props {
  data?: any[];
  label: string;
  id: string;
}

export default class ListComponent extends React.Component<Props> {
  public static defaultProps = {
    label: 'label',
    id: 'id'
  };

  render(): React.ReactNode {
    if (!this.props.data) return <div />;
    return (
      <div className="mx-3 mb-0">
        {this.props.data.map(
          (data, i): React.ReactNode => (
            <div className="flex row mt-1 f4" key={i}>
              {data[this.props.label]}
              <div className="align-end">
                <ArrowRightIcon />
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}
