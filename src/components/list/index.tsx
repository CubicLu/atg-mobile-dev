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
      <div className="list-component-content mb-0">
        {this.props.data.map(
          (data, i): React.ReactNode => (
            <div className="row list-margin-row f4" key={i}>
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
