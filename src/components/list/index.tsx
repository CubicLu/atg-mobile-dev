import React from 'react';
import { Button, ArrowRightIcon } from './../../components';
import {} from './../../actions';
import { IonList, IonItem } from '@ionic/react';

interface Props {
  title: string;
  viewAll?: boolean;
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
    let self = this;
    return (
      <div className="list-component">
        <div className="list-view-all">
          <div>
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="action">
            {this.props.viewAll && (
              <Button color={'transparent'} label={'View All'} />
            )}
          </div>
        </div>

        <IonList lines="none" className="list">
          {this.props.data?.map(
            (data, i): React.ReactNode => (
              <IonItem key={i}>
                <div className="row text">{data[self.props.label]}</div>
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
