import React from 'react';
import { Button, ArrowRightIcon } from './../../components';
import { Colors, ShapesSize } from '../../interfaces';

interface Props {
  title: string;
  viewAll: boolean;
  data?: any[];
  label: string;
  id: string;
}

class ListComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    label: 'label',
    id: 'id'
  };

  render(): React.ReactNode {
    const { title, viewAll, label, data } = this.props;
    if (!data) return <div />;

    return (
      <div className="list-feature-component">
        <div className="align-bottom row">
          <h1 className="title">{title}</h1>
          <div className="align-end">
            {viewAll && (
              <Button color={Colors.transparent} type={ShapesSize.viewAll} />
            )}
          </div>
        </div>

        {data.map(
          (data, i): React.ReactNode => (
            <div className="row list-margin-row text" key={i}>
              {data[label]}
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

export default ListComponent;
