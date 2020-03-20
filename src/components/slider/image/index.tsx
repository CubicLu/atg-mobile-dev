import React from 'react';
import { CardImage, Button } from './../../../components';
import {} from './../../../actions';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
}

class SliderImageComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    scroll: false
  };
  render(): React.ReactNode {
    return (
      <div className="row slider image">
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

        <div className="row">
          {this.props.data?.map(
            (data, i): React.ReactNode => {
              return <CardImage image={data.image} key={i} type={'rounded'} />;
            }
          )}
        </div>
      </div>
    );
  }
}
export default SliderImageComponent;
