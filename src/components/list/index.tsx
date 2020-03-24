import React from 'react';
import { Button, ArrowRightIcon } from './../../components';
import { IonList, IonItem } from '@ionic/react';
import { Colors } from '../../interfaces';

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
      <div className="list-component">
        <div className="list-view-all">
          <div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="action">
            {viewAll && (
              <Button color={Colors.transparent} label={'View All'} />
            )}
          </div>
        </div>

        <IonList lines="none" className="list">
          {data.map(
            (data, i): React.ReactNode => (
              <IonItem key={i}>
                <div className="row text">{data[label]}</div>
                <div className="action">
                  <ArrowRightIcon />
                </div>
              </IonItem>
            )
          )}
        </IonList>
      </div>
    );
  }
}

export default ListComponent;
