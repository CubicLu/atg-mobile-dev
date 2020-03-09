import React from 'react';
import { _, Button, ArrowRightIcon } from './../../components';
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
        <div className={'row content'}>
          <div className="col s8">
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="col s4 view-all">
            {this.props.viewAll && (
              <Button color={'transparent'} label={'View All'} />
            )}
          </div>
        </div>
        <IonList lines="none" className="list">
          {_.map(
            this.props.data,
            (data, i): React.ReactNode => {
              return (
                <IonItem key={i}>
                  <div className="row">
                    <div className={`col s10 text`}>
                      {data[self.props.label]}
                    </div>
                    <div className={`col s2 action`}>
                      <ArrowRightIcon />
                    </div>
                  </div>
                </IonItem>
              );
            }
          )}
        </IonList>
      </div>
    );
  }
}

export default ListComponent;
